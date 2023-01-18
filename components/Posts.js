import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {db} from '../firebase';
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className='px-2 lg:px-0'>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.data().username}
          caption={post.data().caption}
          userImg={post.data().profileImg}
          img={post.data().image}
          id={post.id}
        />
      ))}
    </div>
  );
};
export default Posts;
