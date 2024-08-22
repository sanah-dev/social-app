# Next Js Final Project

url

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
label: '저장',
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

  <Link href={`/users/${user?.id}/tweets`}>작성한 트윗</Link>
<Link href={`/users/${user?.id}/likes`}>좋아요 누른 트윗</Link>
