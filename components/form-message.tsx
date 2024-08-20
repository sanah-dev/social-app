import { CheckCircleIcon } from './icon';

export const FormMessage = ({ message }: { message?: string }) => {
  const hasMessage = message && message.length > 0;

  return (
    <>
      {hasMessage && (
        <p className='flex items-center w-full p-5 bg-green-600'>
          <CheckCircleIcon />
          <span className='pl-2'>{message}</span>
        </p>
      )}
    </>
  );
};
