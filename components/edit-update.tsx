'use client';

import ProfileUpdate from './edit-profile';

export default function ProfileEditPage() {
  const handleSubmit = async (nickname: string) => {
    // 기존 닉네임, 이메일 있는지 확인 후 저장
    console.log('수정되었습니다:', nickname);
  };

  return (
    <>
      <ProfileUpdate action={handleSubmit} />
    </>
  );
}
