import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button } from 'reactstrap';
import UserCard from './UserCard';
import Loading from './Loading';
import UserModal from './UserModal';

const Home = () => {
  const [text, setText] = useState('');
  const { users, getAllUsers } = useContext(GlobalContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {users !== null ? (
        <div className='text-center'>
          <input
            type='text'
            placeholder='Enter Firstname'
            className='m-3 text-center input-text shadow'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className='skewed' />
          <div className='d-flex flex-wrap align-items-center justify-content-center'>
            {users.data
              .filter((user) =>
                user.first_name.toLowerCase().includes(text.toLowerCase())
              )
              .map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
          </div>
          {users !== null && users.page < users.total_pages && (
            <div className='text-center my-4'>
              <Button
                color='primary'
                className='show-more'
                onClick={() => getAllUsers(2)}
              >
                Show more
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
      <UserModal />
    </>
  );
};

export default Home;
