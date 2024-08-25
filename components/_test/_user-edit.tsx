'use client';

import { useState } from 'react';
import PasswordVerification from './_user-password-verification';
import ProfileUpdate from '../_user-profile-update';

export default function ProfileEditPage() {
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);

  // 비밀번호 검증
  const handlePasswordSubmit = async (password: string) => {
    // 여기에 비밀번호 검증 로직을 추가하세요.
    // 예를 들어, 서버에 비밀번호를 검증하는 요청을 보낼 수 있습니다.
    // 여기서는 비밀번호가 'correct_password'일 때를 예로 들어서 구현합니다.
    if (password === '1111') {
      setIsPasswordValidated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // 닉네임 수정
  const handleNicknameSubmit = async (nickname: string) => {
    // 여기에 닉네임을 서버에 저장하는 로직을 추가하세요.
    // 예를 들어, 서버에 닉네임을 저장하는 요청을 보낼 수 있습니다.
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
