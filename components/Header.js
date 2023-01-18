import Image from 'next/image';
import instagram from '../assets/logo/instagram-1.svg';
import instaLogo from '../assets/logo/instagram-glyph-1.svg';

import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {HomeIcon, Bars3Icon} from '@heroicons/react/24/solid';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms/modalAtom';

const Header = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-20'>
      <div className='flex justify-between max-w-7xl px-2 sm:px-6 lg:mx-auto py-2'>
        {/* Left */}
        <div
          className='hidden lg:inline-grid relative w-28 h-10 cursor-pointer'
          onClick={() => router.push('/')}>
          <Image
            src={instagram}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt='instagram'
          />
        </div>
        <div
          className=' lg:hidden relative w-8 h-8 flex-shrink-0 cursor-pointer'
          onClick={() => router.push('/')}>
          <Image
            src={instaLogo}
            fill
            style={{
              objectFit: 'cover',
            }}
            alt='instagram logo'
          />
        </div>
        {/* Middle */}
        <div className='max-w-xs'>
          <div className='flex items-center bg-gray-100 rounded-md px-2 border border-gray-300 focus-within:border-black'>
            <MagnifyingGlassIcon className='h-7 w-7 text-gray-500 pointer-events-none' />
            <input
              type='text'
              placeholder='Search'
              className='bg-gray-100 outline-none ml-1 w-full text-sm'
            />
          </div>
        </div>
        {/* Right */}
        <div className='flex items-center justify-end space-x-4 flex-shrink-0'>
          {session && (
            <PlusCircleIcon
              onClick={() => setOpen(true)}
              className='w-8 h-8 text-black md:hidden cursor-pointer -mr-2'
            />
          )}
          <HomeIcon className='navBtn' />

          {session ? (
            <>
              <div className='hidden md:inline-flex relative navBtn'>
                <PaperAirplaneIcon className='navBtn -rotate-45' />
                <div className='absolute -top-1 -right-1 text-white bg-red-400 rounded-full w-4 h-4 text-center flex justify-center items-center text-xs animate-pulse'>
                  3
                </div>
              </div>
              <PlusCircleIcon
                className='navBtn'
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className='navBtn' />
              <HeartIcon className='navBtn' />
              <img
                src={session.user.image}
                alt='avatar'
                className='h-8 w-8 md:h-10 md:w-10 rounded-full cursor-pointer object-cover'
                height={40}
                width={40}
                priority='true'
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
