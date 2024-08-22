'use client';

import { commentAdd } from '@/app/(home)/(tabs)/tweets/[id]/actions';
import { RiArrowUpCircleFill, RiLoader2Line } from '@remixicon/react';
import { useCallback } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const CommentAdd = ({ id }: { id: number }) => {
  const commentAddWithId = useCallback(
    (prevState: any, formData: FormData) => commentAdd(id, prevState, formData),
    [id]
  );
  const [state, dispatch] = useFormState(commentAddWithId, null);
  const { pending } = useFormStatus();

  return (
    <form
      action={dispatch}
      className='flex items-center justify-between gap-1 bg-white p-1.5 px-4 pr-3 w-[393px] border-t border-zinc-200'
    >
      {state?.error && (
        <span className='text-red-500 font-medium text-left text-xs'>
          * <span className='text-red-500'>{state?.error}</span>
        </span>
      )}

      <label className='w-full'>
        <input
          type='text'
          name='comment_add'
          placeholder='댓글을 입력해주세요.'
          required
          className={`w-full bg-zinc-100 rounded-full p-2 px-4 ${
            state?.error ? 'outline outline-2 outline-rose' : ''
          }`}
        />
      </label>

      <button disabled={pending} className=''>
        {pending ? (
          <RiLoader2Line className='size-6 animate-spin' />
        ) : (
          <RiArrowUpCircleFill className='size-9 text-zinc-400' />
        )}
      </button>
    </form>
  );
};

// const CommentAdd = ({ id }: { id: number }) => {
//   const commentAddWithId = useCallback(
//     (prevState: any, formData: FormData) => commentAdd(id, prevState, formData),
//     [id]
//   );
//   const [state, dispatch] = useFormState(commentAddWithId, null);

//   return <CommentForm action={dispatch} errors={state?.error} />;
// };

export default CommentAdd;
