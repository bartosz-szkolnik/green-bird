import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewTweet from './components/new-tweet';
import Tweets from './components/tweets';
import SignOutButton from './auth/sign-out-button';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data } = await supabase
    .from('tweets')
    .select('*, author: profiles(*), likes(user_id)')
    .order('created_at', { ascending: false });

  const tweets =
    data?.map(tweet => ({
      ...tweet,
      author: tweet.author!,
      userHasLikedTweet: !!tweet.likes.find(like => like.user_id === session.user.id),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="w-full max-w-xl mx-auto text-white">
      <div className="flex justify-between px-4 py-6 border-gray-800 border-t-0 border">
        <h1 className="text-xl font-bold">Home</h1>
        <SignOutButton></SignOutButton>
      </div>
      <NewTweet user={session.user} />
      <Tweets tweets={tweets} />
    </div>
  );
}
