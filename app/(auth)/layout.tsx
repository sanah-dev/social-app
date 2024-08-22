export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <div className='device bg-white'>
        <div className='device-inner'>
          <div className='flex flex-col h-full p-4'>
            {children}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
