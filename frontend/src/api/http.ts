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
    ...(headers as Record<string, string>),
  };

  if (rest.body) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token not found.');
    }

    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: finalHeaders,
    ...rest,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // ignore JSON parse error
  }

  if (!response.ok) {
    if (typeof data === 'object' && data !== null && 'message' in data) {
      throw new Error(String((data as { message: unknown }).message));
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  return data as T;
}
