import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GET_USERS } from '../context/GlobalState';
import { Card, CardImg, CardBody, CardText, Button, Spinner } from 'reactstrap';

const Home = () => {
  const [text, setText] = useState('');
  const { users, getAllUsers } = useContext(GlobalContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {users !== null ? (
        <>
          <input
            type='text'
            placeholder='enter firstname'
            className='m-3 text-center w-25'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className='d-flex flex-wrap align-items-center justify-content-center'>
            {users.data
              .filter((user) =>
                user.first_name.toLowerCase().includes(text.toLowerCase())
              )
              .map((user) => (
                <Card key={user.id} className='p-4 mx-4 my-2 shadow-sm text-center'>
                  <CardImg
                    top
                    width='100%'
                    src={user.avatar}
                    className='rounded-circle'
                  />
                  <CardBody>
                    <CardText>
                      {user.first_name} {user.last_name}
                    </CardText>
                    {/* <CardText>{user.email}</CardText> */}
                    <Button color='info' className='shadow-sm w-100'>
                      Show Profile
                    </Button>
                  </CardBody>
                </Card>
              ))}
          </div>
        </>
      ) : (
        <div className='text-center'>
          <Spinner type='grow' color='primary' className='m-3' />
          <Spinner type='grow' color='secondary' className='m-3' />
          <Spinner type='grow' color='success' className='m-3' />
          <Spinner type='grow' color='danger' className='m-3' />
          <Spinner type='grow' color='warning' className='m-3' />
        </div>
      )}
      {users !== null && users.page < users.total_pages && (
        <div className='text-center my-4'>
          <Button color='primary' onClick={() => getAllUsers(2)}>
            Show more
          </Button>
        </div>
      )}
    </>
  );
};

export default Home;
