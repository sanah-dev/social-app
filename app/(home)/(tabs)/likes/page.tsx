import { getUser } from '@/app/(auth)/action';

export default async function Profile() {
  const user = await getUser();

  return (
    <>
      <h1>내가 좋아한 트윗</h1>
    </>
  );
}
