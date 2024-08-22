import { getUser } from '@/app/(auth)/action';

export default async function Profile() {
  const user = await getUser();

  return (
    <>
      <h1>저장한 트윗</h1>
    </>
  );
}
