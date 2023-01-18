import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {HeartIcon as HeartIconFilled} from '@heroicons/react/24/solid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import {useSession} from 'next-auth/react';
import {useEffect, useRef, useState} from 'react';
import {db} from '../firebase';
import Comment from './Comment';

const Post = (props) => {
  const {id, username, userImg, img, caption} = props;
  const {data: session} = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const inputRef = useRef(null);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    setComment('');

    const commentToSend = comment;

    const message = {
      comment: commentToSend,
      username: session.user.username,
      timestamp: serverTimestamp(),
      userImage: session.user.image,
    };

    await addDoc(collection(db, 'posts', id, 'comments'), message);
  };

  return (
    <div className='bg-white my-7 border rounded-md'>
      {/* header */}
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          alt='userImg'
          className='h-12 w-12 object-contain border p-1 mr-3 rounded-full'
        />
        <p className='flex-1 font-bold'>{username}</p>
        <EllipsisHorizontalIcon className='w-5' />
      </div>
      {/* img */}
      <img src={img} alt='profile' className='w-full object-cover' />
      {/* buttons */}
      {session && (
        <div className='flex justify-between'>
          <div className='flex space-x-4 p-2'>
            {!hasLiked ? (
              <HeartIcon className='btn' onClick={likePost} />
            ) : (
              <HeartIconFilled
                className='btn text-pink-600'
                onClick={likePost}
              />
            )}
            <ChatBubbleOvalLeftEllipsisIcon
              className='btn'
              onClick={() => inputRef.current.focus()}
            />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}
      {/* caption */}
      <p className='p-4 py-3 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-2'>
            <span className='text-pink-600'>{likes.length}</span>{' '}
            {likes.length > 1 ? 'Likes' : 'Like'}
          </p>
        )}
        <span className='mr-1 font-bold'> {username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className='ml-10 max-h-20 overflow-y-scroll scrollbar-thumb-gray-700 scrollbar-thin scrollbar-w-1 scrollbar-thumb-rounded-md mr-1'>
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment.data()} />
          ))}
        </div>
      )}
      {/* input */}
      {session && (
        <form className='flex items-center p-4'>
          <FaceSmileIcon className='w-7' />
          <input
            type='text'
            placeholder='Add a comment...'
            className='border-none flex-1 focus:outline-none text-sm pl-1 md:text-base'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={inputRef}
          />
          <button
            className='font-semibold text-blue-400'
            type='submit'
            disabled={!comment}
            onClick={sendComment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
};
export default Post;
