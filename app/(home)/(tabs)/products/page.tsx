import { notFound } from 'next/navigation';

export default function Products() {
  const shouldShowError = true;

  if (shouldShowError) {
    notFound();
  }

  return <></>;
}
