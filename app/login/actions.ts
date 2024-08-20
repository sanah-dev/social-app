'use server';

import { PASSWORD_REGEX } from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email('이메일을 입력해주세요.')
    .toLowerCase()
    .refine(checkEmailExists, '이메일을 확인해주세요.'),
  password: z
    .string({
      required_error: '비밀번호를 입력해 주세요.',
    })
    .min(4, '최소 4글자 이상 입력해주세요.')
    .regex(
      PASSWORD_REGEX,
      '비밀번호에는 대문자, 소문자, 숫자, 특수 문자 #?!@$%^&*-가 하나 이상 포함되어야 합니다.'
    ),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxxx'
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();

      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호를 확인해주세요.'],
          email: [],
        },
      };
    }
  }
}
