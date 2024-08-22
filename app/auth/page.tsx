import Link from 'next/link';

export default function Home() {
  return (
    <div className='wrapper'>
      <section className='device img-bg *:text-white'>
        <div className='flex flex-col items-center justify-between h-full p-6 py-20'>
          <div className='flex flex-col items-center gap-2'>
            <i className='img-logo w-full min-w-80 h-24' />
            <p className='mt-2 text-sm opacity-80 drop-shadow-neon'>
              키링 나도 사고 싶은데 다시 팔아주라 흑흑
            </p>
          </div>

          <div className='flex flex-col items-center gap-5 w-full'>
            <Link
              href='/create-account'
              className='block w-full h-12 text-center py-3 bg-rose '
            >
              시작하기
            </Link>
            <div className='flex gap-2 text-white opacity-70'>
              <span>이미 계정이 있나요?</span>
              <Link href='/login' className='hover:underline'>
                로그인
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
