const Story = ({username, img}) => {
  return (
    <div className='hover:scale-110 transition-all duration-200'>
      <img
        src={img}
        alt='user profile'
        className='w-14 h-14 rounded-full p-[1px] ring-pink-500 ring-2 object-contain cursor-pointer'
      />
      <p className='w-14 text-xs truncate'>{username}</p>
    </div>
  );
};
export default Story;
