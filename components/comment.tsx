'use client';

import { CommentProps } from '@/app/(auth)/action';
import { commentAdd, commentDelete } from '@/app/(home)/tweets/[id]/actions';
import { useCallback } from 'react';
import { useFormState } from 'react-dom';
import { CommentItem } from './comment-Item';
import { CommentForm } from './comment-form';

export default function Comment({
  id,
  userId,
  comments,
}: {
  id: number;
  userId: number;
  comments: CommentProps[];
}) {
  const commentAddWithId = useCallback(
    (prevState: any, formData: FormData) => commentAdd(id, prevState, formData),
    [id]
  );
  const [state, dispatch] = useFormState(commentAddWithId, null);
  return (
    <div className='min-h-[80px] border-t border-stone-300'>
      {comments.length === 0 && (
        <p className='py-3 text-neutral-500'>댓글이 없습니다.</p>
      )}

      <ul className='flex flex-col max-h-[280px] overflow-y-auto'>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            user={comment.user}
            created_at={comment.created_at}
            payload={comment.payload}
            userId={userId}
            commentDelete={commentDelete}
          />
        ))}
      </ul>

      <CommentForm action={dispatch} errors={state?.error} />
    </div>
  );
}
