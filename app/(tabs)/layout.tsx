import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className='bg-dark'>
        <div className='content'>
          <div className='flex flex-col justify-between h-full'>
            {children}
            <TabBar />
          </div>
        </div>
      </section>
    </main>
  );
}
