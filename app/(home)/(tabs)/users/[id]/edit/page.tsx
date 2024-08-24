import { getUser, logOut } from '@/app/(auth)/action';
import ProfileEditPage from '@/components/edit-update';

export default async function UserEditPage() {
  const user = await getUser();

  return (
    <>
      <div className='title-box'>
        {/* <h1 className='text-2xl'>
          <span className='text-rose'>{user?.username}</span>님
        </h1>
        <h2 className='text-lg'>좋은 하루 보내세요 ☘️</h2> */}
        <p>수정 후 저장하기 버튼을 눌러주세요.</p>

        <ProfileEditPage />
      </div>
    </>
  );
}
