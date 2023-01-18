import {getProviders, signIn} from 'next-auth/react';
import Image from 'next/image';
import Header from '../../components/Header';
import instagram from '../../assets/logo/instagram-1.svg';

const Signin = (props) => {
  const {providers} = props;

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen p-2 -mt-52'>
        <div className='w-80 h-24 relative'>
          <Image
            src={instagram}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt='instagram'
          />
        </div>
        <p className='text-gray-700 italic'>
          This is not a REAL app, it is built for educational purposes only
        </p>
        <div className='mt-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='p-3 bg-blue-500 rounded-lg text-white'
                onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Signin;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {providers},
  };
};
