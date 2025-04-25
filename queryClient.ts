import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch (e) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (errorData?.error || errorData?.message) {
      throw new Error(errorData.error || errorData.message);
    }

    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
}

export async function apiRequest(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (url: string) => Promise<T> =
  ({ on401 }) =>
  async (url: string) => {
    try {
      const res = await apiRequest(url);
      return await res.json();
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.startsWith("HTTP 401") &&
        on401 === "returnNull"
      ) {
        return null as T;
      }
      throw e;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn<unknown>({ on401: "throw" }),
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});