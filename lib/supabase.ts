import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  
  return data || [];
}

// Publications
export async function getPublications() {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .order('publication_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
  
  return data || [];
}

// Blog Categories
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
  
  return data || [];
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
    
    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
    
    // Periksa apakah semua data memiliki blog_categories
    // dan tambahkan default jika tidak
    const processedData = data?.map(blog => {
      if (!blog.blog_categories) {
        return {
          ...blog,
          blog_categories: { name: 'Uncategorized', slug: 'uncategorized' }
        };
      }
      return blog;
    }) || [];
    
    return processedData;
  } catch (error) {
    console.error(`Unexpected error in getAllBlogs:`, error);
    return [];
  }
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
    
    if (error) {
      console.error(`Error fetching blog with ID ${id}:`, error);
      return null;
    }
    
    // Jika blog ditemukan tapi blog_categories null
    if (data && !data.blog_categories) {
      return {
        ...data,
        blog_categories: { name: 'Uncategorized', slug: 'uncategorized' }
      };
    }
    
    return data;
  } catch (error) {
    console.error(`Unexpected error in getBlogById:`, error);
    return null;
  }
}

export async function getBlogsByCategory(categorySlug: string) {
  try {
    const { data: category, error: categoryError } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    if (categoryError || !category) {
      console.error(`Error fetching category with slug ${categorySlug}:`, categoryError);
      return [];
    }
    
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .eq('category_id', category.id)
      .order('date', { ascending: false });
    
    if (error) {
      console.error(`Error fetching blogs for category ${categorySlug}:`, error);
      return [];
    }
    
    // Periksa apakah semua data memiliki blog_categories
    // dan tambahkan default jika tidak
    const processedData = data?.map(blog => {
      if (!blog.blog_categories) {
        return {
          ...blog,
          blog_categories: { name: 'Uncategorized', slug: 'uncategorized' }
        };
      }
      return blog;
    }) || [];
    
    return processedData;
  } catch (error) {
    console.error(`Unexpected error in getBlogsByCategory:`, error);
    return [];
  }
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
    
    if (error) {
      console.error(`Error fetching latest ${count} blogs:`, error);
      return [];
    }
    
    // Periksa apakah semua data memiliki blog_categories
    // dan tambahkan default jika tidak
    const processedData = data?.map(blog => {
      if (!blog.blog_categories) {
        return {
          ...blog,
          blog_categories: { name: 'Uncategorized', slug: 'uncategorized' }
        };
      }
      return blog;
    }) || [];
    
    return processedData;
  } catch (error) {
    console.error(`Unexpected error in getLatestBlogs:`, error);
    return [];
  }
}

export async function getRelatedBlogs(currentBlogId: number, count: number = 3) {
  try {
    // Dapatkan kategori blog saat ini
    const { data: currentBlog, error: currentBlogError } = await supabase
      .from('blogs')
      .select('category_id')
      .eq('id', currentBlogId)
      .single();
    
    if (currentBlogError || !currentBlog) {
      console.error(`Error fetching blog with ID ${currentBlogId}:`, currentBlogError);
      return [];
    }
    
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        blog_categories(name, slug)
      `)
      .eq('category_id', currentBlog.category_id)
      .neq('id', currentBlogId)
      .order('date', { ascending: false })
      .limit(count);
    
    if (error) {
      console.error(`Error fetching related blogs for blog ID ${currentBlogId}:`, error);
      return [];
    }
    
    // Periksa apakah semua data memiliki blog_categories
    // dan tambahkan default jika tidak
    const processedData = data?.map(blog => {
      if (!blog.blog_categories) {
        return {
          ...blog,
          blog_categories: { name: 'Uncategorized', slug: 'uncategorized' }
        };
      }
      return blog;
    }) || [];
    
    return processedData;
  } catch (error) {
    console.error(`Unexpected error in getRelatedBlogs:`, error);
    return [];
  }
}

// Timeline / Journey
export async function getTimelineEvents() {
  const { data, error } = await supabase
    .from('timeline')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching timeline events:', error);
    return [];
  }
  
  return data || [];
}

// Auth functions
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
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
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    throw error;
  }
  
  return data.session;
}

// Fungsi untuk memeriksa apakah pengguna adalah admin
export async function checkIsAdmin(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data?.role === 'admin';
  } catch (error) {
    console.error('Unexpected error in checkIsAdmin:', error);
    return false;
  }
} 