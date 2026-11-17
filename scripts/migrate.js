const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

const rootEnv = { ...loadEnv('.env'), ...loadEnv('.env.local') };
const supabaseUrl = rootEnv.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = rootEnv.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = 'portfolio-assets';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

async function ensureBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;
  const existing = buckets.find(b => b.id === BUCKET_NAME || b.name === BUCKET_NAME);
  if (!existing) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    });
    if (error) throw error;
    console.log(`Bucket '${BUCKET_NAME}' created successfully.`);
  } else {
    console.log(`Bucket '${BUCKET_NAME}' already exists.`);
  }
}

async function optimizeAndUpload(imageBuffer, destinationPath) {
  // Optimize using sharp: resize to max width 1440, webp quality 85, stripped metadata
  const optimizedBuffer = await sharp(imageBuffer)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(destinationPath, optimizedBuffer, {
      contentType: 'image/webp',
      cacheControl: '31536000',
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(destinationPath);

  return {
    publicUrl: publicUrlData.publicUrl,
    originalSize: imageBuffer.length,
    optimizedSize: optimizedBuffer.length,
  };
}

async function run() {
  console.log('=== STARTING SUPABASE STORAGE MIGRATION ===');
  await ensureBucket();

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  const projectMapping = [];
  const blogMapping = [];

  // 1. Projects
  console.log('\n--- Migrating Projects ---');
  const { data: projects, error: pErr } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });
  if (pErr) throw pErr;

  for (const p of projects) {
    const padId = String(p.id).padStart(2, '0');
    const slug = `p${padId}-${slugify(p.title)}`;
    const destinationPath = `projects/${slug}.webp`;

    console.log(`Processing Project [${p.id}] ${p.title.slice(0, 30)}...`);
    const res = await fetch(p.image_url);
    if (!res.ok) {
      throw new Error(`Failed to download project ${p.id} image from ${p.image_url}: HTTP ${res.status}`);
    }
    const rawBuffer = Buffer.from(await res.arrayBuffer());
    const { publicUrl, originalSize, optimizedSize } = await optimizeAndUpload(rawBuffer, destinationPath);

    totalOriginalBytes += originalSize;
    totalOptimizedBytes += optimizedSize;

    // Update database
    const { error: updateErr } = await supabase
      .from('projects')
      .update({ image_url: publicUrl })
      .eq('id', p.id);
    if (updateErr) throw updateErr;

    // Verify public URL
    const checkRes = await fetch(publicUrl, { method: 'HEAD' });
    if (!checkRes.ok) throw new Error(`Uploaded URL check failed: HTTP ${checkRes.status} for ${publicUrl}`);

    console.log(`  -> Saved: ${destinationPath}`);
    console.log(`  -> Size: ${(originalSize/1024).toFixed(1)} KB -> ${(optimizedSize/1024).toFixed(1)} KB (${(((originalSize - optimizedSize)/originalSize)*100).toFixed(1)}% saved)`);
    console.log(`  -> URL: ${publicUrl}`);

    projectMapping.push({
      id: p.id,
      title: p.title,
      oldUrl: p.image_url,
      newUrl: publicUrl,
      originalSize,
      optimizedSize,
    });
  }

  // 2. Blogs
  console.log('\n--- Migrating Blogs ---');
  const { data: blogs, error: bErr } = await supabase
    .from('blogs')
    .select('*')
    .order('id', { ascending: true });
  if (bErr) throw bErr;

  // Replacements for 404/403
  const replacementImages = {
    3: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop', // Computer Vision
    10: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop', // Cybersecurity
  };

  for (const b of blogs) {
    const padId = String(b.id).padStart(2, '0');
    const slug = `b${padId}-${slugify(b.title)}`;
    const destinationPath = `blogs/${slug}.webp`;

    console.log(`Processing Blog [${b.id}] ${b.title.slice(0, 30)}...`);
    const sourceUrl = replacementImages[b.id] || b.image_url;
    if (replacementImages[b.id]) {
      console.log(`  (Using curated high-res replacement for Blog ${b.id} due to previous broken link)`);
    }

    const res = await fetch(sourceUrl);
    if (!res.ok) {
      throw new Error(`Failed to download blog ${b.id} image from ${sourceUrl}: HTTP ${res.status}`);
    }
    const rawBuffer = Buffer.from(await res.arrayBuffer());
    const { publicUrl, originalSize, optimizedSize } = await optimizeAndUpload(rawBuffer, destinationPath);

    totalOriginalBytes += originalSize;
    totalOptimizedBytes += optimizedSize;

    // Update database
    const { error: updateErr } = await supabase
      .from('blogs')
      .update({ image_url: publicUrl })
      .eq('id', b.id);
    if (updateErr) throw updateErr;

    // Verify public URL
    const checkRes = await fetch(publicUrl, { method: 'HEAD' });
    if (!checkRes.ok) throw new Error(`Uploaded URL check failed: HTTP ${checkRes.status} for ${publicUrl}`);

    console.log(`  -> Saved: ${destinationPath}`);
    console.log(`  -> Size: ${(originalSize/1024).toFixed(1)} KB -> ${(optimizedSize/1024).toFixed(1)} KB (${(((originalSize - optimizedSize)/originalSize)*100).toFixed(1)}% saved)`);
    console.log(`  -> URL: ${publicUrl}`);

    blogMapping.push({
      id: b.id,
      title: b.title,
      oldUrl: b.image_url,
      newUrl: publicUrl,
      originalSize,
      optimizedSize,
    });
  }

  // Summary
  console.log('\n========================================');
  console.log('MIGRATION COMPLETED SUCCESSFULLY!');
  console.log(`Total Original Size:  ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Optimized Size: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Bandwidth Saved: ${(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)}%`);
  console.log('========================================\n');

  // Save mapping to file
  fs.writeFileSync(
    'scripts/migration-summary.json',
    JSON.stringify({
      projects: projectMapping,
      blogs: blogMapping,
      stats: {
        totalOriginalBytes,
        totalOptimizedBytes,
        savedPercent: (((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)
      }
    }, null, 2)
  );
  console.log('Migration summary written to scripts/migration-summary.json');
}

run().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
