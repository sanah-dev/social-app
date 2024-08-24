import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  //! url의 code 가져오기
  const code = request.nextUrl.searchParams.get('code');

  // url 입력해서 접근 방지
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  //! url에서 access_token으로 바꿀 파라미터 선언
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  // 최종 url
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  //! access_token POST response 보내고 응답받기
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json', // json 형식으로 주고받기
    },
  });

  //! 응답받은 access_token 저장
  const { error, access_token } = await accessTokenResponse.json();

  // 에러케이스 추가
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  //! access_token GET request 보내고 요청하기
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-cache', // nextjs의 기본 캐싱하지 않음
  });

  //! 사용자 프로파일 데이터 선언
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id + '',
    },
    select: {
      id: true,
    },
  });

  //! 데이터에 user의 계정이 이미 존재한다면 -> 로그인 -> /profile
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect('/');
  }

  //! 데이터에 user의 계정이 없다면 -> 회원가입 -> /profile
  const newUser = await db.user.create({
    data: {
      username: login,
      github_id: id + '',
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect('/');
}
