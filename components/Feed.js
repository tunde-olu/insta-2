import {useSession} from 'next-auth/react';
import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';

const Feed = () => {
  const {data: session} = useSession();

  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && '!grid-cols-1 !max-w-3xl'
      }`}>
      <section className='md:col-span-2'>
        <Stories />
        {session && (
          <div className='px-4  xl:hidden overflow-x-hidden bg-gray-700 p-1 pb-6 text-white mt-4 xl:mt-0'>
            <MiniProfile />
          </div>
        )}
        <Posts />
      </section>

      {session && (
        <section className='hidden xl:block'>
          <div className='h-[480px] sticky mt-10 overflow-y-scroll top-20 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-w-[0.35rem] pr-4'>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
};
export default Feed;
