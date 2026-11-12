import { createClient } from '@supabase/supabase-js';

// Defense-in-depth: Ensure service_role key is NEVER accessed or executed in browser
if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: supabaseAdmin cannot be executed in the browser.');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  '';

/**
 * Server-only Supabase client with administrative privileges.
 * WARNING: This client bypasses Row Level Security (RLS).
 * MUST ONLY be imported in server-side route handlers or server functions.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey || 'placeholder-key', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

