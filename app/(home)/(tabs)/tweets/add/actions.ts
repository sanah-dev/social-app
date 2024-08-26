'use server';

import db from '@/lib/db';
import { tweetSchema } from '@/lib/schema';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export async function createTweet(prevState: any, formData: FormData) {
  const tweet_add = formData.get('tweet_add');
  const result = tweetSchema.safeParse({ tweet_add }); //미사용

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const session = await getSession();
  await db.tweet.create({
    data: {
      tweet: result.data.tweet_add,
      user: {
        connect: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  redirect('/');
}
