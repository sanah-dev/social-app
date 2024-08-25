import Image from 'next/image';
import defaultImage from '@/public/profile.jpeg';

export default function UserAvatar({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const avatarSrc = src ? src : defaultImage;

  return (
    <>
      <Image
        src={avatarSrc}
        alt={alt}
        width={width}
        height={height}
        className={`border border-zinc-300 rounded-full overflow-hidden ${className}`}
      />
    </>
  );
}
