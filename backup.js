// Import the functions you need from the SDKs you need
import {initializeApp, getApps, getApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDmMtZffyY9-iDrYKBtGjYqys_gsdmDnMk',
  authDomain: 'insta-2-62d95.firebaseapp.com',
  projectId: 'insta-2-62d95',
  storageBucket: 'insta-2-62d95.appspot.com',
  messagingSenderId: '282542798120',
  appId: '1:282542798120:web:319df447c1ddaa17be4c1d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

<Transition appear show={open} as={Fragment}>
  <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto'>
    <div
      className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'
      onClose={setOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'>
            <h1>Hello</h1>
          </div>
        </Transition.Child>
      </Transition.Child>
    </div>
  </Dialog>
</Transition>;
