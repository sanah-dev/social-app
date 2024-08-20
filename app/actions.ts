'use server';

export type FormState = {
  errors?: string[];
  message?: string;
};

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const password = formData.get('password');

  if (password === '12345') {
    return {
      errors: [],
      message: 'Welcome back',
    };
  } else {
    return {
      errors: ['Wrong password'],
      message: '',
    };
  }
}
