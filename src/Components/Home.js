import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import Loading from './Loading';
import UserModal from './UserModal';

const Home = () => {
  const [text, setText] = useState('');
  const { users, getAllUsers, getSingleUser } = useContext(
    GlobalContext
  );

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
            className='m-3 text-center input shadow'
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
                <div key={user.id}>
                  <img
                    width='130px'
                    src={user.avatar}
                    className='rounded-circle position-relative shadow-lg user-image'
                    alt='user_image'
                  />
                  <Card
                    key={user.id}
                    className='p-4 mx-4 my-2 shadow-lg text-center user-card'
                  >
                    <CardBody>
                      <CardText>
                        {user.first_name} {user.last_name}
                      </CardText>
                      {/* <CardText>{user.email}</CardText> */}
                      <Button
                        outline
                        color='primary'
                        className='shadow w-100'
                        onClick={() => getSingleUser(user.id)}
                      >
                        Show Profile
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </div>
          {users !== null && users.page < users.total_pages && (
            <div className='text-center my-4'>
              <Button color='primary' className='show-more' onClick={() => getAllUsers(2)}>
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
