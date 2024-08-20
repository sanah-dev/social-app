'use server';

import db from '@/lib/db';

export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    take: 1,
    skip: page * 1,
    orderBy: {
      created_at: 'desc',
    },
  });
  return tweets;
}

export async function getTweetDetails(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
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
