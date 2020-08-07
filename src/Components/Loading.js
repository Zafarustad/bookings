import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
  return (
    <div className='text-center'>
      <Spinner type='grow' color='primary' className='m-3' />
      <Spinner type='grow' color='secondary' className='m-3' />
      <Spinner type='grow' color='success' className='m-3' />
      <Spinner type='grow' color='danger' className='m-3' />
      <Spinner type='grow' color='warning' className='m-3' />
    </div>
  );
};

export default Loading;
