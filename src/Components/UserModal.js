import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const UserModal = () => {
  const { user, modal, closeModal } = useContext(GlobalContext);

  return (
    user && (
      <>
        <Modal isOpen={modal} centered className=''>
          <ModalHeader toggle={() => closeModal()} charCode='X'>
            Profile
          </ModalHeader>
          <ModalBody className='text-center d-flex align-items-center'>
            <img
              src={user.data.avatar}
              width='150px'
              className='rounded-circle mx-4'
            />
            <div className='d-flex flex-column align-items-center text-center m-3'>
              <span className='my-2'>
                {user.data.first_name} {user.data.last_name}
              </span>
              <span>{user.data.email}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary'>Book a slot</Button>
            <Button color='danger' outline onClick={() => closeModal()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  );
};

export default UserModal;
