import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getSessionToken } from './supabase';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

interface ApiRequestOptions {
  queryParams?: Record<string, string>;
  [key: string]: any;
}

export async function apiRequest(
  method: string,
  url: string,
  options?: ApiRequestOptions,
): Promise<Response> {
  try {
    // Get the Supabase session token for authenticated requests
    const token = await getSessionToken();
    
    // Handle query parameters
    const urlObj = new URL(url, window.location.origin);
    
    // Add any query parameters
    if (options?.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        urlObj.searchParams.append(key, value);
      });
    }
    
    // Only include body for non-GET requests
    const hasBody = method !== 'GET' && method !== 'HEAD' && options && 'data' in options;
    
    const res = await fetch(urlObj.toString(), {
      method,
      headers: {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        "Authorization": `Bearer ${token}`
      },
      body: hasBody ? JSON.stringify(options.data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Get the Supabase session token for authenticated requests
      const token = await getSessionToken();
      
      // The first element is the base URL
      const baseUrl = queryKey[0] as string;
      
      // Get URL object to add query parameters
      const url = new URL(baseUrl, window.location.origin);
      
      // If there are any query parameters, add them (queryKey[2] onwards might contain params)
      if (queryKey.length > 2 && typeof queryKey[2] === 'object') {
        Object.entries(queryKey[2] as Record<string, string>).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }
      
      const res = await fetch(url.toString(), {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      console.error('Query function error:', error);
      // Handle when there's no active session
      if (error instanceof Error && error.message.includes('No session found')) {
        if (unauthorizedBehavior === "returnNull") {
          return null;
        } else {
          throw new Error("Unauthorized");
        }
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
