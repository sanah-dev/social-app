import { getUser, logOut } from '@/app/(auth)/action';
import Button from '@/components/button';
import ButtonPrev from '@/components/button-prev';

export default async function Profile() {
  const user = await getUser();

  return (
    <>
      <div className='title-box'>
        <h1 className='text-2xl'>
          <span className='text-rose'>{user?.username}</span>님
        </h1>
        <h2 className='text-lg'>좋은 하루 보내세요 ☘️</h2>
        <p>오늘도 방문해 주셔서 감사합니다.</p>

        <h1>/users/[username]/edit</h1>
        <p>프로필 수정</p>
        <p>사용자 이름, 이메일, 자기소개, 비밀번호 변경</p>
      </div>
    </>
  );
}
