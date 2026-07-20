import { createClient } from '@/lib/client';
import { Database } from '@/lib/database.types';

export const supabase = createClient();

export async function safeQuery<T>(queryPromise: any, fallbackData: T): Promise<T> {
  try {
    const { data, error } = await queryPromise;
    if (error || !data) {
      console.warn("Supabase query error or no data, falling back to mock data:", error);
      return fallbackData;
    }
    return data;
  } catch (err) {
    console.error("Supabase connection failed, falling back to mock data:", err);
    return fallbackData;
  }
}
