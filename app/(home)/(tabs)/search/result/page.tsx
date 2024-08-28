import { notFound } from 'next/navigation';
import TweetSearchList from '@/components/search/search-list';
import SearchInput from '@/components/search/search-input';
import { getSearchedTweet } from '../action';

interface SearchResultPageProps {
  searchParams: { keyword: string };
}

export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const keyword = searchParams.keyword;

  if (!keyword) {
    notFound();
  }

  const tweets = await getSearchedTweet(keyword);

  return (
    <>
      <SearchInput />

      {keyword ? (
        <div className='flex items-center justify-center gap-1 p-4 border-b-8 border-b-zinc-200'>
          <span className='text-rose'>{keyword}</span>검색결과
          <span>
            <span className='text-rose'>{tweets.length}</span>개
          </span>
        </div>
      ) : (
        '검색 결과'
      )}

      {tweets.length === 0 ? (
        <p className='p-4 text-zinc-400'>검색결과가 없습니다.</p>
      ) : (
        <TweetSearchList initialTweets={tweets} />
      )}
    </>
  );
}
