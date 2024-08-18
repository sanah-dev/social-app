import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main>
      <section className='bg-dark'>
        <div className='content'>
          <div className='title-box'>
            <h1 className='text-2xl text-rose'>404</h1>
            <h2 className='text-lg'>페이지 정보가 없어요 😥</h2>
            <p>입력하신 주소가 정확한지 확인해주세요.</p>
          </div>
          <Link href='/' className='footer-btn'>
            메인페이지로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
