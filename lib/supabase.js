import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- PRODUCTS ----
export async function getProducts(filters = {}) {
  let query = supabase.from('products').select('*').eq('active', true);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.search) query = query.ilike('name', `%${filters.search}%`);
  if (filters.sort === 'price_asc') query = query.order('price', { ascending: true });
  else if (filters.sort === 'price_desc') query = query.order('price', { ascending: false });
  else query = query.order('created_at', { ascending: false });
  const { data, error } = await query;
  if (error) console.error('getProducts error:', error);
  return data || [];
}

export async function getProduct(id) {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) console.error('getProduct error:', error);
  return data;
}

export async function getFeaturedProducts() {
  const { data } = await supabase.from('products').select('*').eq('featured', true).eq('active', true).limit(8);
  return data || [];
}

export async function getCategories() {
  const { data } = await supabase.from('products').select('category').eq('active', true);
  const cats = [...new Set((data || []).map(p => p.category).filter(Boolean))];
  return cats;
}

// ---- ORDERS ----
export async function createOrder(orderData) {
  const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
  if (error) { console.error('createOrder error:', error); return null; }
  return data;
}

export async function getOrder(id) {
  const { data } = await supabase.from('orders').select('*, order_items(*)').eq('id', id).single();
  return data;
}

export async function getOrders() {
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function updateOrderStatus(id, status) {
  const { data } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
  return data;
}

// ---- CUSTOMERS ----
export async function getCustomers() {
  const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function upsertCustomer(customerData) {
  const { data } = await supabase.from('customers').upsert([customerData], { onConflict: 'phone' }).select().single();
  return data;
}

// ---- ADMIN PRODUCTS ----
export async function adminGetProducts() {
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function insertProduct(product) {
  const { data, error } = await supabase.from('products').insert([product]).select().single();
  if (error) { console.error('insertProduct error:', error); return null; }
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateProduct error:', error); return null; }
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return !error;
}

// ---- SETTINGS ----
export async function getSettings() {
  const { data } = await supabase.from('settings').select('*').single();
  return data || {};
}

export async function updateSettings(settings) {
  const { data } = await supabase.from('settings').upsert([{ id: 1, ...settings }]).select().single();
  return data;
}

// ---- DASHBOARD STATS ----
export async function getDashboardStats() {
  const [{ count: totalOrders }, { data: revenueData }, { count: totalProducts }, { count: totalCustomers }] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('total').neq('status', 'cancelled'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
  ]);
  const totalRevenue = (revenueData || []).reduce((sum, o) => sum + (o.total || 0), 0);
  return { totalOrders: totalOrders || 0, totalRevenue, totalProducts: totalProducts || 0, totalCustomers: totalCustomers || 0 };
}
