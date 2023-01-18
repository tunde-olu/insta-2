import {faker} from '@faker-js/faker';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import Story from './Story';

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const {data: session} = useSession();

  useEffect(() => {
    const suggestions = Array.from({length: 20}, (_, index) => {
      return {
        _id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sexType(),
      };
    });
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='flex space-x-2 p-3 bg-white mt-8 border-gray-200 rounded-sm border overflow-x-auto min-w-full ease-out scrollbar-thin scrollbar-thumb-black scrollbar-h-[0.2rem] scrollbar-thumb-rounded'>
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile._id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};
export default Stories;
