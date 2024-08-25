import { getUser, logOut } from '@/app/(auth)/action';
import ProfileEditPage from '@/components/edit-update';
import UserProfile from '@/components/user-profile';
import Image from 'next/image';

export default async function UserEditPage() {
  const user = await getUser();

  return (
    <>
      <div className='flex flex-col items-center gap-2 p-4 '>
        {/* border-b border-b-zinc-200 */}

        <UserProfile />

        <p>수정 후 저장하기 버튼을 눌러주세요.</p>
      </div>

      <ProfileEditPage />
    </>
  );
}
