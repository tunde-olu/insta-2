const Suggestion = (props) => {
  const {avatar, username, company} = props;
  return (
    <div className='flex items-center justify-between mt-2 '>
      <img
        src={avatar}
        alt='profile avatar'
        className='w-10 h-10 rounded-full p-[2px]'
      />
      <div className='flex-1 ml-4'>
        <h2 className='font-semibold text-sm'>{username}</h2>
        <h3 className='text-xs text-gray-400'>Works at {company}</h3>
      </div>
      <button className='text-blue-400 font-bold text-xs'>Follow</button>
    </div>
  );
};
export default Suggestion;
