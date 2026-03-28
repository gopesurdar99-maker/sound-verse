const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

const BASE_URL = API_URL;

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products/`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(slug: string) {
  const res = await fetch(`${BASE_URL}/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createOrder(
  token: string,
  payload: {
    billing_name: string;
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    items: {
      id: number;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }[];
    subtotal: number;
    shipping: number;
    total_amount: number;
    payment_method: string;
    payment_reference: string;
  }
) {
  const res = await fetch(`${BASE_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.detail || data?.message || "Failed to create order");
  }

  return data;
}

export async function fetchOrder(orderCode: string, token: string) {
  const res = await fetch(`${BASE_URL}/orders/${orderCode}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function fetchSingleOrder(token: string, orderCode: string) {
  const res = await fetch(`${BASE_URL}/orders/${orderCode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.detail || "Failed to fetch order");
  }

  return data;
}

export async function fetchMyOrders(token: string) {
  const res = await fetch(`${BASE_URL}/orders/me/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function signupUser(payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to sign up");
  return res.json();
}

export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function fetchCurrentUser(token: string) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch current user");
  return res.json();
}

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchAdminProducts(token: string) {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch admin products");
  return res.json();
}

export async function fetchAdminOrders(token: string) {
  const res = await fetch(`${BASE_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch admin orders");
  return res.json();
}

export async function fetchLowStockAlerts(token: string) {
  const res = await fetch(`${BASE_URL}/admin/alerts/low-stock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch low stock alerts");
  return res.json();
}

export async function fetchDashboardSummary(token: string) {
  const res = await fetch(`${BASE_URL}/admin/dashboard-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard summary");
  return res.json();
}

export async function createAdminProduct(
  token: string,
  payload: {
    name: string;
    slug: string;
    brand: string;
    main_category: string;
    sub_category: string;
    price: number;
    original_price: number;
    rating: number;
    review_count: number;
    stock: number;
    featured: boolean;
    best_seller: boolean;
    use_case: string;
    noise_cancellation: boolean;
    battery_life: string;
    connectivity: string;
    mic: boolean;
    color: string;
    image: string;
    description: string;
  }
) {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateAdminProductStock(
  token: string,
  productId: number,
  stock: number
) {
  const res = await fetch(`${BASE_URL}/admin/products/${productId}/stock`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ stock }),
  });

  if (!res.ok) throw new Error("Failed to update stock");
  return res.json();
}

export async function deleteAdminProduct(token: string, productId: number) {
  const res = await fetch(`${BASE_URL}/admin/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

export async function fetchAdminUsers(token: string) {
  const res = await fetch(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  return res.json();
}

export async function approveAdminUser(token: string, userId: number) {
  const res = await fetch(`${BASE_URL}/admin/users/${userId}/approve`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to approve user");
  return res.json();
}

export async function deleteAdminUser(token: string, userId: number) {
  const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

export async function updateAdminOrderStatus(
  token: string,
  orderId: number,
  orderStatus: string
) {
  const res = await fetch(`${BASE_URL}/admin/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order_status: orderStatus }),
  });

  if (!res.ok) throw new Error("Failed to update order status");
  return res.json();
}

export async function cancelMyOrder(token: string, orderCode: string) {
  const res = await fetch(`${BASE_URL}/orders/${orderCode}/cancel`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "Failed to cancel order");
  }
  return res.json();
}
