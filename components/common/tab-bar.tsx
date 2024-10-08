// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { getUser } from '@/app/(auth)/action';
// import { baseTabItems, ITabPath } from '@/lib/basePath';

// export default function TabBar() {
//   const pathname = usePathname();
//   const [tabItems, setTabItems] = useState<ITabPath[]>([]);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const user = await getUser();
//         const username = user?.username ?? '';

//         const updatedTabItems = baseTabItems.map((item) => ({
//           ...item,
//           href: item.label === 'Profile' ? `/users/${username}` : item.href,
//         }));

//         setTabItems(updatedTabItems);
//       } catch (error) {
//         console.error('Failed to fetch user:', error);
//       }
//     }

//     fetchUser();
//   }, []);

//   return (
//     <div className='w-full grid grid-cols-5 bg-zinc-100'>
//       {tabItems.map((tab, idx) => (
//         <Link
//           key={idx}
//           href={tab.href}
//           className='flex flex-col items-center justify-center gap-1 h-16 text-xs text-zinc-400 hover:text-zinc-600'
//         >
//           {/* TODO: 하위 자식 url일때도 icon active상태로 개선 */}
//           {pathname === tab.href ? tab.icon.active : tab.icon.inactive}
//           {pathname === tab.href ? (
//             <span className='text-zinc-600'>{tab.label}</span>
//           ) : (
//             <span className=''>{tab.label}</span>
//           )}
//         </Link>
//       ))}
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getTabRoutePaths, ROUTE_PATHS } from '@/lib/basePath';
import { getUser } from '@/app/(auth)/action';

export interface ITabPath {
  label: string;
  href: string;
  icon: {
    active: JSX.Element;
    inactive: JSX.Element;
  };
}

export default function TabBar() {
  const pathname = usePathname();
  const [tabItems, setTabItems] = useState<ITabPath[]>([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser();
        const username = user?.username ?? '';

        setTabItems(getTabRoutePaths(username));
      } catch (error) {
        setTabItems([]);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className='w-full grid grid-cols-5 bg-zinc-100'>
      {tabItems.map((tab, idx) => (
        <Link
          key={idx}
          href={tab.href}
          className='flex flex-col items-center justify-center gap-1 h-16 text-xs text-zinc-400 hover:text-zinc-600'
        >
          {pathname === tab.href ? tab.icon.active : tab.icon.inactive}
          <span className={pathname === tab.href ? 'text-zinc-600' : ''}>
            {tab.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
