import { Database as SupabaseDatabase } from '@/lib/database.types';

declare global {
  type Database = SupabaseDatabase;
}
