import { notFound } from 'next/navigation';
import TweetSearchList from '@/components/search/search-list';
import { getSearchedTweet } from '../action';
import SearchInput from '@/components/search/search-input';

interface SearchResultPageProps {
  searchParams: { search: string };
}

export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const search = searchParams.search;

  if (!search) {
    notFound();
  }

  const tweets = await getSearchedTweet(search);

  return (
    <>
      <SearchInput />
      {search ? `${search}로 검색한 결과 : ${tweets.length}건` : '검색 결과'}

      <TweetSearchList initialTweets={tweets} />
    </>
  );
}
