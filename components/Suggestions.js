import {faker} from '@faker-js/faker';
import {useEffect, useState} from 'react';
import Suggestion from './Suggestion';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [length, setLength] = useState(5);

  const increaseLengthHandler = () => {
    setLength((prev) => prev + 5);
  };

  useEffect(() => {
    const suggestions = Array.from({length}, (_, index) => {
      return {
        _id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sexType(),
        company: faker.company.name(),
      };
    });

    setSuggestions(suggestions);
  }, [length]);

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='font-bold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>
      {suggestions.map((profile) => (
        <Suggestion key={profile._id} {...profile} />
      ))}
      {length < 30 && (
        <button
          className='mx-auto block my-2 text-blue-700'
          onClick={increaseLengthHandler}>
          see more
        </button>
      )}
    </div>
  );
};
export default Suggestions;
