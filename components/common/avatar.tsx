import Image from 'next/image';
import defaultImage from '@/public/profile.jpeg';

export default function UserAvatar({
  avatar,
  username,
  width,
  height,
  className,
}: {
  avatar: string | null;
  username: string;
  width: number;
  height: number;
  className?: string;
}) {
  const avatarSrc = avatar ? avatar : defaultImage;

  return (
    <>
      <Image
        src={avatarSrc}
        alt={username}
        width={width}
        height={height}
        className={`border border-zinc-300 rounded-full overflow-hidden ${className}`}
      />
    </>
  );
}
