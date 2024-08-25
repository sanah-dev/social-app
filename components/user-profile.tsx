import { getUser } from '@/app/(auth)/action';
import UserAvatar from './common/avatar';
import { UserProps } from '@/types';

export default async function UserProfile() {
  const user = await getUser();

  if (!user) {
    return <div>User not found</div>;
  }
  if (!user.username) {
    return <div>Username is missing</div>;
  }

  return (
    <>
      <UserAvatar
        width={60}
        height={60}
        avatar={user.avatar}
        username={user.username}
      />
      <span className='text-base'>{user.username}</span>
    </>
  );
}
