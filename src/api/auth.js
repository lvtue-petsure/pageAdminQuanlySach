import { supabase } from '../supabaseClient';

/**
 * Login dựa trên bảng 'users' trong Supabase
 * Lưu ý: chỉ dùng cho thử nghiệm, password plain text → KHÔNG AN TOÀN
 * @param {string} email 
 * @param {string} password 
 * @returns user object nếu thành công, null nếu thất bại
 */
export const handleLogin = async (email, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userName', email)
    .eq('password', password)
    .eq('isAdmin', true)
    .eq('isActive', true)
    .single();
  if (error || !data) {
    return { success: false, message: 'Login failed', user: null };
  } else {
    return { success: true, message: 'Login successful', user: data };
  }
};
