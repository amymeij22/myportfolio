const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');

function loadEnv() {
  const env = {};
  ['.env', '.env.local'].forEach(file => {
    if (fs.existsSync(file)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const idx = trimmed.indexOf('=');
        if (idx !== -1) env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      }
    }
  });
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET_NAME = 'portfolio-assets';

const supabase = createClient(supabaseUrl, supabaseKey);

async function optimizeAndUploadBlogImage(localImagePath, blogId, storageFilename) {
  console.log(`\n=== Processing Image for Blog [${blogId}] ===`);
  console.log(`Source: ${localImagePath}`);
  
  if (!fs.existsSync(localImagePath)) {
    throw new Error(`File not found: ${localImagePath}`);
  }

  const rawBuffer = fs.readFileSync(localImagePath);
  const originalSize = rawBuffer.length;
  console.log(`Original size: ${(originalSize / 1024).toFixed(1)} KB`);

  // Optimize with sharp: max width 1440, WebP quality 85, effort 6
  const optimizedBuffer = await sharp(rawBuffer)
    .resize({ width: 1440, height: 900, fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();

  const optimizedSize = optimizedBuffer.length;
  console.log(`Optimized size: ${(optimizedSize / 1024).toFixed(1)} KB (${(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}% saved)`);

  const destinationPath = `blogs/${storageFilename}`;
  console.log(`Uploading to Supabase Storage: ${BUCKET_NAME}/${destinationPath}...`);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(destinationPath, optimizedBuffer, {
      contentType: 'image/webp',
      cacheControl: '31536000',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Storage upload error: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(destinationPath);

  const publicUrl = publicUrlData.publicUrl;
  console.log(`Public URL: ${publicUrl}`);

  // Test URL accessibility with HEAD request
  const testRes = await fetch(publicUrl, { method: 'HEAD' });
  if (!testRes.ok) {
    throw new Error(`Public URL validation failed: HTTP ${testRes.status}`);
  }
  console.log(`Verified URL access: HTTP ${testRes.status} (${testRes.headers.get('content-type')})`);

  // Update Supabase database
  console.log(`Updating database for Blog ID ${blogId}...`);
  const { data: updateData, error: updateError } = await supabase
    .from('blogs')
    .update({ image_url: publicUrl })
    .eq('id', blogId)
    .select('id, title, image_url');

  if (updateError) {
    throw new Error(`Database update error: ${updateError.message}`);
  }

  console.log(`Database updated successfully:`, updateData);
  return { publicUrl, originalSize, optimizedSize };
}

module.exports = { optimizeAndUploadBlogImage };

if (require.main === module) {
  const [,, sourcePath, blogId, filename] = process.argv;
  if (!sourcePath || !blogId || !filename) {
    console.log('Usage: node scripts/upload_single_asset.js <sourcePath> <blogId> <storageFilename>');
    process.exit(1);
  }
  optimizeAndUploadBlogImage(sourcePath, parseInt(blogId, 10), filename)
    .then(() => console.log('Done!'))
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}
