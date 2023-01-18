import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms/modalAtom';
import {CameraIcon} from '@heroicons/react/24/outline';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import {db, storage} from '../firebase';
import {useSession} from 'next-auth/react';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';

const Modal = () => {
  const {data: session} = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user.username,
      profileImg: session?.user.image,
      caption: captionRef.current.value,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        if (!selectedFile) return;
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    // 1. create a post and add to firestore 'posts' collection
    // 2. get the post ID for the newly created post
    // 3. upload the image to firebase storage with the post ID
    // 4. get a download URL from firebase storage and update the original post with image
  };

  const addImageToPost = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
  };

  if (!open) return;
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-y-scroll'>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt='file'
                      onClick={() => setSelectedFile(null)}
                      className='w-full object-contain cursor-pointer max-h-56'
                    />
                  ) : (
                    <div
                      className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                      onClick={() => filePickerRef.current.click()}>
                      <CameraIcon
                        className='h-6 w-6 text-red-600'
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  <div className=' mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900  my-2'>
                      Upload a photo
                    </Dialog.Title>
                    <div className='my-3'>
                      <input
                        type='text'
                        placeholder='Please enter a caption...'
                        className='p-2 outline-none'
                        ref={captionRef}
                      />
                    </div>
                    <div>
                      <input
                        type='file'
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center w-full rounded-md border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                        disabled={!selectedFile}
                        onClick={uploadPost}>
                        {loading ? 'Uploading...' : 'Upload Post'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
