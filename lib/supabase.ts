import { createClient } from '@supabase/supabase-js';
import { allBlogs as fallbackBlogs, BlogPost as FallbackBlogPost } from './blog-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Create Supabase client safely
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function mapFallbackBlog(blog: FallbackBlogPost) {
  return {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    date: blog.date,
    excerpt: blog.excerpt,
    image_url: blog.image,
    content: blog.content || `<p>${blog.excerpt}</p>`,
    blog_categories: {
      name: blog.category,
      slug: blog.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

// Projects
export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase projects query notice:', error.message);
      return [];
    }

    return data;
  } catch (err) {
    console.warn('Unexpected error in getProjects:', err);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.warn('Unexpected error in getFeaturedProjects:', err);
    return [];
  }
}

// Publications
export async function getPublications() {
  try {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('publication_date', { ascending: false });

    if (error || !data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.warn('Unexpected error in getPublications:', err);
    return [];
  }
}

// Blog Categories
export async function getBlogCategories() {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Supabase categories fetch notice:', err);
  }

  // Fallback categories from fallbackBlogs
  const categoriesMap = new Map<string, { id: number; name: string; slug: string }>();
  fallbackBlogs.forEach((blog, idx) => {
    if (!categoriesMap.has(blog.category)) {
      categoriesMap.set(blog.category, {
        id: idx + 1,
        name: blog.category,
        slug: blog.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      });
    }
  });
  return Array.from(categoriesMap.values());
}

// Blogs / Articles
export async function getAllBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .order('date', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((blog) => ({
        ...blog,
        blog_categories: blog.blog_categories || { name: 'General', slug: 'general' },
      }));
    }
  } catch (error) {
    console.warn('Notice in getAllBlogs, falling back to local blog data:', error);
  }

  // Fallback to local blog dataset
  return fallbackBlogs.map(mapFallbackBlog);
}

export async function getBlogById(id: number) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .eq('id', id)
      .single();

    if (!error && data) {
      return {
        ...data,
        blog_categories: data.blog_categories || { name: 'General', slug: 'general' },
      };
    }
  } catch (error) {
    console.warn(`Notice in getBlogById for ${id}:`, error);
  }

  const fallback = fallbackBlogs.find((b) => b.id === id);
  if (fallback) {
    return mapFallbackBlog(fallback);
  }
  return null;
}

export async function getBlogsByCategory(categorySlug: string) {
  try {
    const { data: category } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (category) {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_categories(name, slug)
        `)
        .eq('category_id', category.id)
        .order('date', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((blog) => ({
          ...blog,
          blog_categories: blog.blog_categories || { name: 'General', slug: 'general' },
        }));
      }
    }
  } catch (error) {
    console.warn(`Notice in getBlogsByCategory for ${categorySlug}:`, error);
  }

  const normalized = categorySlug.toLowerCase();
  return fallbackBlogs
    .filter((b) => b.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized)
    .map(mapFallbackBlog);
}

export async function getLatestBlogs(count: number = 3) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .order('date', { ascending: false })
      .limit(count);

    if (!error && data && data.length > 0) {
      return data.map((blog) => ({
        ...blog,
        blog_categories: blog.blog_categories || { name: 'General', slug: 'general' },
      }));
    }
  } catch (error) {
    console.warn(`Notice in getLatestBlogs for count ${count}:`, error);
  }

  return fallbackBlogs.slice(0, count).map(mapFallbackBlog);
}

export async function getRelatedBlogs(currentBlogId: number, count: number = 3) {
  const current = await getBlogById(currentBlogId);
  const currentCat = current?.blog_categories?.name;

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .neq('id', currentBlogId)
      .order('date', { ascending: false })
      .limit(count);

    if (!error && data && data.length > 0) {
      return data.map((blog) => ({
        ...blog,
        blog_categories: blog.blog_categories || { name: 'General', slug: 'general' },
      }));
    }
  } catch (error) {
    console.warn(`Notice in getRelatedBlogs for ${currentBlogId}:`, error);
  }

  return fallbackBlogs
    .filter((b) => b.id !== currentBlogId)
    .filter((b) => !currentCat || b.category === currentCat)
    .slice(0, count)
    .map(mapFallbackBlog);
}

// Timeline / Journey
export async function getTimelineEvents() {
  try {
    const { data, error } = await supabase
      .from('timeline')
      .select('*')
      .order('start_date', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data;
  } catch (err) {
    console.warn('Notice in getTimelineEvents:', err);
    return [];
  }
}

// Auth functions
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}

export async function getCurrentUser() {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  } catch {
    return null;
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function checkIsAdmin(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      return false;
    }

    return data?.role === 'admin';
  } catch {
    return false;
  }
}
