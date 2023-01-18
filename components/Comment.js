import Moment from 'react-moment';

const Comment = (props) => {
  const {userImage, username, comment, timestamp} = props;

  return (
    <div className='flex items-center space-x-2 mb-3'>
      <img src={userImage} alt='user' className='h-7 rounded-full' />
      <p className='text-sm flex-1'>
        <span className='font-bold mr-1'>{username}</span> {comment}
      </p>
      <Moment fromNow className='pr-2 text-xs'>
        {new Date(timestamp.toDate())}
      </Moment>
    </div>
  );
};
export default Comment;
