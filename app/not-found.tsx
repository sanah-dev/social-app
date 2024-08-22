import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <div className='title-box'>
        <h1 className='text-2xl text-rose'>404</h1>
        <h2 className='text-lg'>페이지 정보가 없어요 😥</h2>
        <p>입력하신 주소가 정확한지 확인해주세요.</p>
      </div>
      <Link
        href='/'
        className='absolute bottom-6 left-6 block w-[calc(100%-3rem)] h-12 text-center py-3 bg-rose text-white'
      >
        메인으로 이동
      </Link>
    </>
  );
}
