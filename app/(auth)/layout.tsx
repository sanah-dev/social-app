export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <div className='device bg-white'>
        {/* <section className='device-inner'> */}
        <section className='flex flex-col w-full h-full justify-between p-4'>
          {children}
        </section>
      </div>
    </div>
  );
}
