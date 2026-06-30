const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
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

export interface Address {
  id: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productSku: string;
  product: { imageUrl: string | null };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes: string | null;
  trackingNumber: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: Address | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  comparePrice: number | null;
  unit: string;
  imageUrl: string | null;
  active: boolean;
  category: { name: string };
}

export interface WishlistItem {
  id: string;
  productId: string;
  createdAt: string;
  product: Product;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  orderId: string | null;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
}

export interface SupportMessage {
  id: string;
  fromAdmin: boolean;
  message: string;
  createdAt: string;
}

export interface RewardTransaction {
  id: string;
  points: number;
  type: string;
  description: string;
  orderId: string | null;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string | null;
  body: string | null;
  status: string;
  createdAt: string;
  product: Pick<Product, 'id' | 'name' | 'imageUrl' | 'slug'>;
}

export interface DashboardSummary {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  wishlistCount: number;
  addressCount: number;
  rewardPoints: number;
  recentOrders: Order[];
}

// ─── HTTP client ──────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user_token') ?? localStorage.getItem('admin_token');
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function http<T = any>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/v1${path}`, {
    ...options,
    credentials: 'include',
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

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  me: () => http<User>('/auth/me'),
  logout: () => http('/auth/logout', { method: 'POST' }),
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const profileApi = {
  update: (data: { firstName?: string; lastName?: string; businessName?: string; phone?: string }) =>
    http<User>('/users/me', { method: 'PATCH', body: JSON.stringify(data) }),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    http('/users/me/change-password', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface PaginatedOrders {
  items: Order[];
  total: number;
  page: number;
  limit: number;
}

export const ordersApi = {
  list: (page = 1, status?: string) =>
    http<PaginatedOrders>(`/orders?page=${page}${status ? `&status=${status}` : ''}`)
      .then((r) => r.items),
  get: (id: string) => http<Order>(`/orders/${id}`),
};

// ─── Addresses ────────────────────────────────────────────────────────────────

export const addressesApi = {
  list: () => http<Address[]>('/users/me/addresses'),
  save: (data: Partial<Address>) =>
    http<Address>('/users/me/addresses', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) => http(`/users/me/addresses/${id}`, { method: 'DELETE' }),
};

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export const wishlistApi = {
  list: () => http<WishlistItem[]>('/wishlist'),
  add: (productId: string) =>
    http<WishlistItem>('/wishlist', { method: 'POST', body: JSON.stringify({ productId }) }),
  remove: (productId: string) => http(`/wishlist/${productId}`, { method: 'DELETE' }),
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const notificationsApi = {
  list: () => http<Notification[]>('/notifications'),
  markRead: (id: string) => http(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () => http('/notifications/read-all', { method: 'PATCH' }),
  delete: (id: string) => http(`/notifications/${id}`, { method: 'DELETE' }),
};

// ─── Support ──────────────────────────────────────────────────────────────────

export const supportApi = {
  listTickets: () => http<SupportTicket[]>('/support/tickets'),
  getTicket: (id: string) => http<SupportTicket>(`/support/tickets/${id}`),
  createTicket: (data: { subject: string; category: string; priority?: string; message: string; orderId?: string }) =>
    http<SupportTicket>('/support/tickets', { method: 'POST', body: JSON.stringify(data) }),
  replyTicket: (id: string, message: string) =>
    http<SupportMessage>(`/support/tickets/${id}/messages`, { method: 'POST', body: JSON.stringify({ message }) }),
};

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviewsApi = {
  list: () => http<Review[]>('/reviews'),
  create: (data: { productId: string; rating: number; title?: string; body?: string; orderId?: string }) =>
    http<Review>('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { rating?: number; title?: string; body?: string }) =>
    http<Review>(`/reviews/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => http(`/reviews/${id}`, { method: 'DELETE' }),
};

// ─── Rewards ──────────────────────────────────────────────────────────────────

export const rewardsApi = {
  summary: () => http<{ totalPoints: number; lifetimePoints: number; tier: string; nextTierPoints: number }>('/rewards'),
  history: () => http<RewardTransaction[]>('/rewards/history'),
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const dashboardApi = {
  summary: () => http<DashboardSummary>('/users/me/dashboard'),
};
