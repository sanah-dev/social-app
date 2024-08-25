'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { UserProps } from '@/types';
import { redirect } from 'next/navigation';

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
// user API
export async function fetchUser(): Promise<UserProps> {
  const response = await fetch('/api/user'); // 데이터 요청
  const data: UserProps | null = await response.json();

  if (!data) {
    throw new Error('User not found'); // 데이터가 null인 경우 에러 처리
  }

  return data;
}

/* 로그아웃 */
// export async function logOut() {
//   const session = await getSession();
//   session.destroy();
//   return redirect('/auth');
// }
export async function logOut() {
  const session = await getSession(); // 세션 가져오기
  if (session) {
    session.destroy(); // 세션 삭제
  }
  // 리다이렉트 반환
  return redirect('/auth'); // 클라이언트 측에서 리다이렉션을 수행하도록 리턴
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
