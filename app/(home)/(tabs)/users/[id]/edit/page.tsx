// import { getUser } from '@/app/(auth)/action';
// import ProfileEditPage from '@/components/edit-update';
// import UserProfile from '@/components/user-profile';

// export default async function UserEditPage() {
//   const user = await getUser();

//   return (
//     <>
//       <div className='flex flex-col items-center gap-2 p-4 '>
//         {/* border-b border-b-zinc-200 */}

//         <UserProfile />

//         <p>수정 후 저장하기 버튼을 눌러주세요.</p>
//       </div>

//       <ProfileEditPage />
//     </>
//   );
// }

import EditProfile from '@/components/edit/edit-profile';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

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
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const user = await getUser(id);

  return (
    <>
      <EditProfile userInfo={user} />
    </>
  );
}
