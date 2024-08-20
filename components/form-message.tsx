import { FormState } from '@/app/actions';
import { CheckCircleIcon } from './icon';

export const FormErrorMessage = ({ errors }: FormState) => {
  return (
    <>
      {errors &&
        errors.map((error, index) => (
          <p key={index} className='error-message'>
            {error}
          </p>
        ))}
    </>
  );
};

export const FormSuccessMessage = ({ message }: FormState) => {
  return (
    <>
      {message && (
        <p className='flex items-center w-full p-5 bg-green-600'>
          <CheckCircleIcon />
          <span className='pl-2'>{message}</span>
        </p>
      )}
    </>
  );
};
