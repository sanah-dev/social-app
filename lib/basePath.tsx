import { PROFIRE_EDIT_PATH_REGEX, PROFIRE_PATH_REGEX } from './constants';
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchFill,
  RiSearchLine,
  RiAddBoxFill,
  RiAddBoxLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiUser5Fill,
  RiUser5Line,
} from '@remixicon/react';

export const ROUTE_TITLE = {
  HOME: 'Tweet',
  SEARCH: 'Search',
  SEARCH_RESULT: 'Result',
  LIKES: 'Likes',
  TWEET_ADD: 'New Tweet',
  TWEET_DETAIL: 'View',
  PROFILE: 'Profile',
  PROFILE_EDIT: 'Profile Edit',
};

export const ROUTE_PATHS = {
  HOME: '/',
  SEARCH: '/search',
  SEARCH_RESULT: '/search/result',
  LIKES: '/likes',
  TWEET_ADD: '/tweets/add',
  TWEET_DETAIL: (tweetId: string) => `/tweets/${tweetId}`,
  PROFILE: (username: string) => `/users/${username}`,
  PROFILE_EDIT: (username: string) => `/users/${username}/edit`,
};

export const getHeaderRoutePaths = (pathname: string) => {
  if (pathname === ROUTE_PATHS.HOME) return ROUTE_TITLE.HOME;
  if (pathname === ROUTE_PATHS.SEARCH) return ROUTE_TITLE.SEARCH;
  if (pathname === ROUTE_PATHS.SEARCH_RESULT) return ROUTE_TITLE.SEARCH_RESULT;
  if (pathname === ROUTE_PATHS.LIKES) return ROUTE_TITLE.LIKES;
  if (pathname === ROUTE_PATHS.TWEET_ADD) return ROUTE_TITLE.TWEET_ADD;

  if (pathname.startsWith('/tweets/') && pathname.split('/').length === 3) {
    return ROUTE_TITLE.TWEET_DETAIL;
  }
  if (PROFIRE_EDIT_PATH_REGEX.test(pathname)) return ROUTE_TITLE.PROFILE_EDIT;
  if (PROFIRE_PATH_REGEX.test(pathname)) return ROUTE_TITLE.PROFILE;

  return '';
};

export const getTabRoutePaths = (username: string) => [
  {
    label: ROUTE_TITLE.HOME,
    href: ROUTE_PATHS.HOME,
    icon: {
      active: <RiHome2Fill size={18} className='text-zinc-600' />,
      inactive: <RiHome2Line size={18} />,
    },
  },
  {
    label: ROUTE_TITLE.SEARCH,
    href: ROUTE_PATHS.SEARCH,
    icon: {
      active: <RiSearchFill size={18} className='text-zinc-600' />,
      inactive: <RiSearchLine size={18} />,
    },
  },
  {
    label: 'Add',
    href: ROUTE_PATHS.TWEET_ADD,
    icon: {
      active: <RiAddBoxFill size={18} className='text-zinc-600' />,
      inactive: <RiAddBoxLine size={18} />,
    },
  },
  {
    label: ROUTE_TITLE.LIKES,
    href: ROUTE_PATHS.LIKES,
    icon: {
      active: <RiHeart3Fill size={18} className='text-zinc-600' />,
      inactive: <RiHeart3Line size={18} />,
    },
  },
  {
    label: ROUTE_TITLE.PROFILE,
    href: ROUTE_PATHS.PROFILE(username),
    icon: {
      active: <RiUser5Fill size={18} className='text-zinc-600' />,
      inactive: <RiUser5Line size={18} />,
    },
  },
];
