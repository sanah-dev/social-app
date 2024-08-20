import Button from './button';

export function CommentForm({
  action,
  errors,
}: {
  action?: (formData: FormData) => void;
  errors?: string;
}) {
  return (
    <>
      <form action={action} className='relative'>
        {errors && (
          <span className='text-red-500 font-medium text-left text-xs'>
            * <span className='text-red-500'>{errors}</span>
          </span>
        )}

        <label className='relative flex items-center gap-4'>
          <input
            type='text'
            name='comment_add'
            placeholder='댓글을 입력해주세요.'
            required
            className={`grow bg-light h-12 p-2 pr-12 ring-2 ring-purple ${
              errors ? 'outline outline-2 outline-rose' : ''
            }`}
          />
        </label>

        <button className='absolute bottom-0 right-0 w-10 h-full text-light bg-purple'>
          ↩
        </button>
      </form>
    </>
  );
}
