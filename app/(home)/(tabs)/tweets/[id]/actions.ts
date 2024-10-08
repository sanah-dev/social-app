'use server';

import { getTweet, getUser } from '@/app/(auth)/action';
import db from '@/lib/db';
import { commentSchema } from '@/lib/schema';
import getSession from '@/lib/session';
import { revalidatePath, revalidateTag } from 'next/cache';

/* 코멘트 */
export async function commentAdd(
  id: number,
  prevState: any,
  formData: FormData
) {
  try {
    const user = await getUser();
    const tweet = await getTweet(id);
    const comment_add = formData.get('comment_add');

    if (typeof comment_add !== 'string') {
      return { error: 'Invalid comment content' };
    }

    const result = commentSchema.safeParse({ comment_add });

    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    if (!user) {
      return { error: 'User not found' };
    }

    if (!tweet) {
      return { error: 'Tweet not found' };
    }

    await db.comment.create({
      data: {
        payload: result.data.comment_add,
        userId: user.id,
        tweetId: tweet.id,
      },
    });
    revalidatePath(`/tweets/${id}`);
  } catch (e) {}
}
export async function commentDelete(id: number) {
  try {
    await db.comment.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/tweets/${id}`);
  } catch (e) {}
}

/* 좋아요 */
export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.error('Error liking tweet:', e);
  }
}
export async function unLikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.error('Error unliking tweet:', e);
  }
}

/* 저장 */
export async function saveTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`save-status-${tweetId}`);
  } catch (e) {}
}
export async function unSaveTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`save-status-${tweetId}`);
  } catch (e) {}
}
