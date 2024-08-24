'use client';

import { useState } from 'react';
import PasswordVerification from '@/components/_user-password-verification';
import ProfileUpdate from '@/components/_user-profile-update';

export default function ProfileEditPage() {
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);

  // 비밀번호 검증
  const handlePasswordSubmit = async (password: string) => {
    if (password === '1111') {
      setIsPasswordValidated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // 닉네임 수정
  const handleNicknameSubmit = async (nickname: string) => {
    console.log('닉네임이 수정되었습니다:', nickname);
  };

  return (
    <>
      {/* {!isPasswordValidated ? (
        <PasswordVerification />
      ) : (
        <ProfileUpdate action={handleNicknameSubmit} />
      )} */}
    </>
  );
}
