'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { UserProps } from '@/types';
import { redirect } from 'next/navigation';

// User API
// header, tab-bar
export async function fetchUser(): Promise<UserProps> {
  const response = await fetch('/api/user'); // 데이터 요청
  const data: UserProps | null = await response.json();
  if (!data) {
    throw new Error('User not found'); // 데이터가 null인 경우 에러 처리
  }
  return data;
}

/* 사용자 */
export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
      },
    });
    return user || null;
  }

  return null;
}

/* 로그아웃 */
export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect('/login');
}

/* 사용자별 트윗 가져오기 */
export async function getTweet(id: number) {
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

/* 트윗별 댓글 가져오기 */
export async function getComments(tweetId: number) {
  const comments = await db.comment.findMany({
    where: {
      tweetId: tweetId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      tweet: {
        select: {
          userId: true,
          id: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return comments;
}
