'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { z } from 'zod';

// 비밀번호 가져오기
// const checkPassword = async (password: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       password,
//     },
//     select: {
//       id: true,
//     },
//   });

//   return Boolean(user);
// };

// 비밀번호 검증 스키마
const passwordSchema = z.object({
  password: z.string(),
});

// 비밀번호 검증 함수
export const verifyPasswordAction = async (
  prevState: any,
  formData: FormData
) => {
  const password = formData.get('password');
  const result = await passwordSchema.safeParseAsync(password);

  console.log(result);

  if (!result.success) {
    return {
      fieldErrors: {
        password: ['비밀번호를 확인해주세요.'],
      },
    };
  } else {
    return { success: true };
  }
};
