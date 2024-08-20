'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export interface UserProps {
  id: number;
  username: string;
  password: string;
  email: string;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface TweetProps {
  user: {
    username: string;
    email: string;
  };
  id: number;
  created_at: Date;
  updated_at: Date;
  Likes: {
    user: {
      id: number;
      username: string;
      password: string;
      email: string;
      bio: string | null;
      created_at: Date;
      updated_at: Date;
    };
  }[];
  tweet: string;
}

export interface CommentProps {
  user: {
    id: number;
    username: string;
    email: string;
  };
  tweet: {
    userId: number;
    id: number;
  };
  id: number;
  created_at: Date;
  updated_at: Date;
  payload: string;
}

/* 사용자 */
export async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
}

/* 로그아웃 */
export async function logOut() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
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
          email: true,
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
