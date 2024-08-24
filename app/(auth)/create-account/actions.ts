'use server';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export type FormState = {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
      confirm_password?: string[];
    };
  };
  message?: string;
};

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    email: z.string().email('이메일 형식으로 입력하세요.').toLowerCase(),
    username: z.string().min(2, '2글자 이상 입력하세요.'),
    password: z.string().min(5, '5글자 이상 입력하세요.'),
    confirm_password: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용 중인 이름입니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용 중인 이메일 입니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    session.username = user.username;
    await session.save();

    redirect('/');
  }
}
