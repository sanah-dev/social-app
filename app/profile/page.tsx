import Button from '@/components/button';
import ButtonPrev from '@/components/button-prev';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';

    const session = await getSession();
    await session.destroy();

    redirect('/');
  };
  return (
    <main>
      <section className='bg-dark'>
        <div className='content'>
          <div className='title-box'>
            <ButtonPrev />
            <h1 className='text-2xl'>
              <span className='text-rose'>{user?.username}</span>님
            </h1>
            <h2 className='text-lg'>좋은 하루 보내세요 ☘️</h2>
            <p>오늘도 방문해 주셔서 감사합니다.</p>
          </div>

          <form action={logOut}>
            <Button className='footer-btn'>로그아웃</Button>
          </form>
        </div>
      </section>
    </main>
  );
}
