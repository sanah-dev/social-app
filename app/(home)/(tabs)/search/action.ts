'use server';

import db from '@/lib/db';

export async function getSearchedTweet(search: string) {
  const tweets = await db.tweet.findMany({
    where: {
      OR: [
        {
          tweet: {
            contains: search, // 텍스트가 포함된 트윗을 검색
            mode: 'insensitive', // 대소문자 구분 없이 검색
          },
        },
      ],
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
          avatar: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
  return tweets;
}
