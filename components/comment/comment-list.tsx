'use client';

import { commentDelete } from '@/app/(home)/(tabs)/tweets/[id]/actions';
import { CommentItem } from './comment-Item';
import { CommentProps } from '@/types';

export default function CommentList({
  id,
  userId,
  comments,
}: {
  id: number;
  userId: number;
  comments: CommentProps[];
}) {
  return (
    <>
      <ul className='flex flex-col overflow-y-auto border-t-8 border-t-zinc-200'>
        {comments.length === 0 ? (
          <li className='p-4 text-zinc-400'>댓글을 한 번 남겨볼까요?</li>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              id={comment.id}
              user={comment.user}
              created_at={comment.created_at}
              payload={comment.payload}
              userId={userId}
              commentDelete={commentDelete}
            />
          ))
        )}
      </ul>
    </>
  );
}
