import Header from '@/components/common/header';
import TabBar from '@/components/common/tab-bar';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='wrapper'>
      <div className='device bg-white'>
        <Header />
        <section className='device-inner'>{children}</section>
        <TabBar />
      </div>
    </section>
  );
}
