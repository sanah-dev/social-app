import { z } from 'zod';
import db from './db';
import { validateUserEmail, validateUserName } from '@/lib/validate';

/* form 인증 */

// 회원가입
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

export const createAccountSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    username: z
      .string()
      .min(2, '2글자 이상 입력하세요.')
      .transform((value) => value.replaceAll(' ', '')),
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

// 로그인
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

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, '이메일을 확인해주세요.'),
  password: z.string().min(5, '5글자 이상 입력하세요.'),
});

// 검색
export const searchSchema = z.object({
  search: z.string().min(1, '1글자 이상 입력하세요.'),
});

// 트윗 작성
export const tweetSchema = z.object({
  tweet_add: z
    .string()
    .min(5, '5자 이상 입력해주세요.')
    .max(1000, '최대 1000자까지 작성 가능합니다.'),
});

// 코멘트 작성
export const commentSchema = z.object({
  comment_add: z.string().max(100, '100자 이내로 작성해주세요.'),
});

// 프로필 수정
export const profileEditSchema = z
  .object({
    avatar: z.string(),
    username: z
      .string({
        required_error: '닉네임을 입력해주세요.',
      })
      .min(2, '2글자 이상 입력하세요.')
      .toLowerCase()
      .transform((value) => value.replaceAll(' ', '')),
    email: z
      .string()
      .email('이메일 형식으로 입력하세요.')
      .toLowerCase()
      .optional(),
    password: z
      .string({
        required_error: '비밀번호를 입력해주세요.',
      })
      .min(5, '5글자 이상 입력하세요.'),
    new_password: z.string().min(5, '5글자 이상 입력하세요.').optional(),
    confirm_password: z.string().optional(),
    bio: z.string().optional(),
  })
  .superRefine(async ({ username }, ctx) => {
    const validatedUsername = await validateUserName(username);
    if (!validatedUsername) {
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
    const validatedEmail = await validateUserEmail(email ? email : '');
    if (!validatedEmail) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용 중인 이메일 입니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  });
