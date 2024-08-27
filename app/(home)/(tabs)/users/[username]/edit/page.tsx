import EditProfile from '@/components/edit/edit-profile';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { getUserProfile } from '../action';
import NotFoundPage from '@/app/not-found';

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export type UserInfo = Prisma.PromiseReturnType<typeof getUser>;

export default async function EditUserProfile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserProfile(params.username);
  if (!user) {
    return NotFoundPage;
  }

  return (
    <>
      <EditProfile userInfo={user} />
    </>
  );
}
