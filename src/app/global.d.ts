import { Database as SupabaseDatabase } from '@/lib/database.types';

type Tweet = SupabaseDatabase['public']['Tables']['tweets']['Row'];
type Profile = SupabaseDatabase['public']['Tables']['profiles']['Row'];

declare global {
  type Database = SupabaseDatabase;

  type TweetWithAuthor = Tweet & {
    author: Profile;
    userHasLikedTweet: boolean;
    likes: number;
  };
}
