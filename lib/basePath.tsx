import {
  RiAddBoxFill,
  RiAddBoxLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiHomeFill,
  RiHomeLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from '@remixicon/react';

export interface IHeaderPath {
  label: string;
  href: string;
  prev: boolean;
}

export const basePathItems: IHeaderPath[] = [
  {
    label: '홈',
    href: '/',
    prev: false,
  },
  {
    label: '게시글',
    href: '/tweets/:id', // 기본값
    prev: true,
  },
  {
    label: '추가',
    href: '/tweets/add',
    prev: true,
  },
  {
    label: '검색',
    href: '/search',
    prev: false,
  },
  {
    label: '내가 저장한 트윗',
    href: '/saved',
    prev: false,
  },
  {
    label: '프로필',
    href: '/users/:id', // 기본값
    prev: false,
  },
  {
    label: '프로필 편집',
    href: '/users/:id/edit', // 기본값
    prev: true,
  },
  {
    label: '프로필 편집',
    href: '/users/:id/edit', // 기본값
    prev: true,
  },
  {
    label: '내가 작성한 트윗',
    href: '/users/:id/tweets', // 기본값
    prev: true,
  },
  {
    label: '내가 좋아한 트윗',
    href: '/users/:id/likes', // 기본값
    prev: true,
  },
];

export interface ITabPath {
  label: string;
  href: string;
  icon: {
    active: JSX.Element;
    inactive: JSX.Element;
  };
}

export const baseTabItems: ITabPath[] = [
  {
    label: '트윗',
    href: '/',
    icon: {
      active: <RiHomeFill size={18} className='text-zinc-600' />,
      inactive: <RiHomeLine size={18} />,
    },
  },
  {
    label: '검색',
    href: '/search',
    icon: {
      active: <RiSearchFill size={18} className='text-zinc-600' />,
      inactive: <RiSearchLine size={18} />,
    },
  },
  {
    label: '추가',
    href: '/tweets/add',
    icon: {
      active: <RiAddBoxFill size={18} className='text-zinc-600' />,
      inactive: <RiAddBoxLine size={18} />,
    },
  },
  {
    label: '저장',
    href: '/saved',
    icon: {
      active: <RiBookmarkFill size={18} className='text-zinc-600' />,
      inactive: <RiBookmarkLine size={18} />,
    },
  },
  {
    label: '프로필',
    href: '/users/:id', // 기본값
    icon: {
      active: <RiUserFill size={18} className='text-zinc-600' />,
      inactive: <RiUserLine size={18} />,
    },
  },
];
