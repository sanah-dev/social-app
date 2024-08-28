'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserInfo } from '@/app/(home)/(tabs)/users/[username]/edit/page';
import {
  getUploadUrl,
  updateUserProfile,
} from '@/app/(home)/(tabs)/users/[username]/edit/action';
import {
  RiImageFill,
  RiKey2Line,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
  RiUserSmileLine,
} from '@remixicon/react';
import Button from '../button/button';
import Input from '../common/input';
import { profileEditSchema } from '@/lib/schema';
import UserAvatar from '../common/avatar';
import { redirect } from 'next/navigation';

interface FormEditProfileProps {
  userInfo: UserInfo;
}

interface UserFormType {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  new_password: string;
  bio: string;
  avatar: string;
}

export default function EditProfile({ userInfo }: FormEditProfileProps) {
  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email ? userInfo?.email : undefined,
      bio: userInfo?.bio ? userInfo.bio : undefined,
      avatar: userInfo?.avatar ? userInfo.avatar : undefined,
    },
  });

  // 이미지 변경
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        'avatar',
        `https://imagedelivery.net/bFhcswKacq-KD2SavcAAA/${id}`
      );
    }
  };

  // 저장
  const onSubmit = handleSubmit(async (data: UserFormType) => {
    if (file) {
      const cloudflareForm = new FormData();
      cloudflareForm.append('file', file);
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
    }

    const formData = new FormData();
    formData.append('avatar', data.avatar);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('new_password', data.new_password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('bio', data.bio);

    const errors = await updateUserProfile(formData);
    if (errors) {
      setError('password', { message: errors?.fieldErrors.password?.at(0) });
    }

    redirect(`/`);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <form action={onValid} className='flex flex-col p-4'>
      <div className='flex flex-col items-center'>
        <label
          htmlFor='avatar'
          className='relative flex flex-col self-center items-center justify-center gap-1 size-28 bg-cover border border-zinc-300 rounded-full overflow-hidden cursor-pointer'
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {/* {userInfo?.avatar && (
            <UserAvatar
              width={128}
              height={128}
              src={`${userInfo.avatar}/avatar`}
              alt={userInfo.username}
            />
          )} */}

          {preview === '' && (
            <div
              className={`absolute top-0 left-0 flex flex-col items-center justify-center gap-1 w-full h-full rounded-full opacity-50 transition hover:opacity-100`}
            >
              <RiImageFill />
              <span className='text-xs text-center font-semibold'>
                이미지 {userInfo?.avatar ? '변경' : '추가'}
              </span>
            </div>
          )}
        </label>

        <input
          onChange={onImageChange}
          type='file'
          id='avatar'
          name='avatar'
          accept='image/*'
          className='hidden'
        />

        {errors.avatar?.message && (
          <p className='text-red-600'>{errors.avatar.message}</p>
        )}
      </div>

      <Input
        text='username'
        placeholder={userInfo?.username}
        {...register('username')}
        errors={errors.username?.message ? [errors.username.message] : []}
        icon={
          <RiUserLine size={16} className='absolute left-3 text-zinc-400' />
        }
      />

      <Input
        text='email'
        type='email'
        placeholder={userInfo?.email ? userInfo.email : '이메일을 추가해주세요'}
        {...register('email')}
        errors={errors.email?.message ? [errors.email.message] : []}
        icon={
          <RiMailLine size={14} className='absolute left-3 text-zinc-400' />
        }
      />

      <Input
        text='bio'
        type='text'
        placeholder={
          userInfo?.bio ? userInfo.bio : '나를 표현하는 한줄을 작성해주세요.'
        }
        {...register('bio')}
        errors={errors.bio?.message ? [errors.bio.message] : []}
        icon={
          <RiUserSmileLine
            size={16}
            className='absolute left-3 text-zinc-400'
          />
        }
      />

      <Input
        text='password'
        type='password'
        placeholder='기존 비밀번호를 입력해주세요'
        {...register('password')}
        errors={errors.password?.message ? [errors.password.message] : []}
        icon={
          <RiLockPasswordLine
            size={16}
            className='absolute left-3 text-zinc-400'
          />
        }
      />

      <Input
        text='new password'
        type='password'
        placeholder='새로운 비밀번호를 입력해주세요'
        {...register('new_password')}
        errors={
          errors.new_password?.message ? [errors.new_password.message] : []
        }
        icon={
          <RiKey2Line size={16} className='absolute left-3 text-zinc-400' />
        }
      />

      {/* <Input
        text='new password confirm'
        type='password'
        placeholder='새로운 비밀번호를 확인해주세요'
        {...register('confirm_password')}
        errors={
          errors.confirm_password?.message
            ? [errors.confirm_password.message]
            : []
        }
        icon={
          <RiKey2Line size={16} className='absolute left-3 text-zinc-400' />
        }
      /> */}

      <Button className='mt-3'>저장</Button>
    </form>
  );
}
