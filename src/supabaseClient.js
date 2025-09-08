import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xbyabttdnhlfjbtjpvjq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhieWFidHRkbmhsZmpidGpwdmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjUwMzUsImV4cCI6MjA3MjQ0MTAzNX0.WWDvYbbJJiSS427VB4bvbRtvfF-uAHoCy4w6cewMveI';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);