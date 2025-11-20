import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
}

console.log('Supabase config:', {url: supabaseUrl, hasKey: !!supabaseKey, keyPreview: supabaseKey?.substring(0,20)});

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
