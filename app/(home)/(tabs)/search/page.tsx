import { getUser } from '@/app/(auth)/action';

export default async function SearchPage() {
  const user = await getUser();

  return (
    <>
      <h1>트윗 검색하기</h1>
    </>
  );
}
