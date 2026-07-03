const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function http<T = any>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options?.headers ?? {}) as Record<string, string>),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, json?.message ?? `HTTP ${res.status}`);
  return (json?.data !== undefined ? json.data : json) as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  users: number;
  products: number;
  orders: number;
  quotes: number;
  pendingQuotes: number;
  recentOrders: AdminOrder[];
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName: string | null;
  phone: string | null;
  role: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
  parentId: string | null;
  _count?: { products: number };
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  unit: string;
  stockQty: number | null;
  featured: boolean;
  imageUrl: string | null;
  active: boolean;
  categoryId: string;
  category: { id: string; name: string };
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
  user: { id: string; email: string; firstName: string; lastName: string };
  items: { id: string; quantity: number; unitPrice: number; productName: string }[];
}

// ─── Admin API ────────────────────────────────────────────────────────────────

export const adminApi = {
  login: (email: string, password: string) =>
    http<{ accessToken: string; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getStats: () => http<DashboardStats>('/admin/dashboard/stats'),

  getCustomers: (page = 1) =>
    http<{ items: AdminUser[]; total: number; page: number; limit: number }>(
      `/admin/users?page=${page}`
    ).then((r) => r.items ?? r),

  getOrders: (page = 1, status?: string) =>
    http<{ items: AdminOrder[]; total: number; page: number; limit: number }>(
      `/admin/orders?page=${page}${status ? `&status=${status}` : ''}`
    ).then((r) => r.items ?? r),

  updateOrderStatus: (id: string, status: string) =>
    http<AdminOrder>(`/admin/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  getProducts: () => http<AdminProduct[]>('/admin/products'),

  saveProduct: (data: Partial<AdminProduct> & { id?: string }) => {
    const { id, ...body } = data;
    return id
      ? http<AdminProduct>(`/admin/products/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
      : http<AdminProduct>('/admin/products', { method: 'POST', body: JSON.stringify(body) });
  },

  deleteProduct: (id: string) => http(`/admin/products/${id}`, { method: 'DELETE' }),

  getCategories: () => http<AdminCategory[]>('/admin/categories'),

  saveCategory: (data: Partial<AdminCategory> & { id?: string }) => {
    const { id, ...body } = data;
    return id
      ? http<AdminCategory>(`/admin/categories/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
      : http<AdminCategory>('/admin/categories', { method: 'POST', body: JSON.stringify(body) });
  },

  deleteCategory: (id: string) => http(`/admin/categories/${id}`, { method: 'DELETE' }),
};
