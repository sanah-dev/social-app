'use server';

import { revalidatePath } from 'next/cache';
import db from './db';
import { searchSchema } from './schema';
import getSession from './session';
import { redirect } from 'next/navigation';

export async function validateUserName(username: string) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (session.id === user?.id) return Boolean(user);

  return !Boolean(user);
}

export async function validateUserEmail(email: string) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (session.id === user?.id) return Boolean(user);

  return !Boolean(user);
}

export async function validateSearchKeyword(
  prevState: any,
  formData: FormData
) {
  const data = {
    keyword: formData.get('keyword'),
  };

  const result = await searchSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const searchKeyword = encodeURI(result.data.keyword);
    revalidatePath(`/search/result?keyword=${searchKeyword}`);
    redirect(`/search/result?keyword=${searchKeyword}`);
  }
}
