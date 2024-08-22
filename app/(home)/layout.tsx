import Header from '@/components/header';
import TabBar from '@/components/tab-bar';

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='wrapper'>
      <div className='device bg-white'>
        <Header />
        <div className='device-inner'>{children}</div>
        <TabBar />
      </div>
    </section>
  );
}
