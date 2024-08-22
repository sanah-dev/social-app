export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper'>
      <div className='device bg-white'>
        <div className='device-inner'>
          <div className='flex flex-col justify-between h-full'>
            {children}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
