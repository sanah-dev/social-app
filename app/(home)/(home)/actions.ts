'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { z } from 'zod';

/* Tweet List */
export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      views: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 3,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}

/* Tweet Item */
export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      views: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 3,
    skip: page * 3,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}

/* Tweet Detail */
export async function getTweetDetails(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      views: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      likes: {
        select: {
          user: true,
        },
      },
    },
  });
  return tweet;
}

/* Tweet Add */
const tweetSchema = z.object({
  tweet_add: z
    .string()
    .min(1, '글자를 입력해주세요.')
    .max(500, '최대 500글자까지 작성 가능합니다.'),
});
export async function createTweet(prevState: any, formData: FormData) {
  const tweet_add = formData.get('tweet_add');
  const result = tweetSchema.safeParse({ tweet_add });

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

  return { success: true };
}
