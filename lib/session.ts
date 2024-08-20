import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
  username?: string;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'sanah-cookies',
    password: process.env.COOKIE_PASSWORD!,
  });
}
