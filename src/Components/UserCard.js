import React, { useContext } from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';
import { GlobalContext } from '../context/GlobalState';

const UserCard = ({ user }) => {
  const { getSingleUser } = useContext(GlobalContext);
  return (
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
  );
};

export default UserCard;
