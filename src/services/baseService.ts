import { createClient } from '@/lib/client';

export const supabase = createClient();

export interface QueryResult<T> {
  data: T | null;
  error: string | null;
  isFallback: boolean;
}

export async function safeQuery<T>(queryPromise: any, fallbackData: T): Promise<QueryResult<T>> {
  if (!supabase) {
    return { data: fallbackData, error: 'Supabase environment variables are not configured', isFallback: true };
  }

  try {
    const { data, error } = await queryPromise;
    if (error) {
      console.error('Supabase query error:', error);
      return { data: fallbackData, error: error.message || 'Supabase query failed', isFallback: true };
    }

    if (!data) {
      return { data: fallbackData, error: 'No data returned from Supabase', isFallback: true };
    }

    return { data: data as T, error: null, isFallback: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown Supabase connection error';
    console.error('Supabase connection failed:', message);
    return { data: fallbackData, error: message, isFallback: true };
  }
}
