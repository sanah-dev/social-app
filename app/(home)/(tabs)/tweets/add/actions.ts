'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

/* Tweet Add */
const tweetSchema = z.object({
  tweet_add: z
    .string()
    .min(5, '5자 이상 입력해주세요.')
    .max(1000, '최대 1000자까지 작성 가능합니다.'),
});

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
