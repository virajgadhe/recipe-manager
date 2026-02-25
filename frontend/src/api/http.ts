const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export async function http<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = false, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = localStorage.getItem('token');
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: finalHeaders,
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}
