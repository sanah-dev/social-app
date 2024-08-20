'use server';

import { z } from 'zod';

export type FormState = {
  errors?: {
    email?: string[];
    userName?: string[];
    password?: string[];
  };
  message?: string[];
};

const formSchema = z.object({
  email: z.string().regex(/@zod\.com$/, 'Only @zod.com emails are allowed.'),
  userName: z.string().min(5, 'username should be at least 5 characters long.'),
  password: z
    .string()
    .min(10, 'Password contain at least 10 characters long.')
    .regex(/\d/, 'Password should contain at least one number (0123456789).'),
});

export async function handleForm(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = {
    userName: formData.get('userName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten();
    return {
      errors: {
        email: errors.fieldErrors.email || [],
        userName: errors.fieldErrors.userName || [],
        password: errors.fieldErrors.password || [],
      },
    };
  } else {
    return {
      message: ['Welcome back!'],
    };
  }
}
