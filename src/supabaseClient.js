import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://btbxfgirzbvmqfhrltcy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YnhmZ2lyemJ2bXFmaHJsdGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNjg2MzAsImV4cCI6MjA3Mzg0NDYzMH0.NxCBsFUCVA9kojfWaqogrMk4yI6wXW3q4JvKnHAaS9k';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);