import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UserModal = () => {
  const [date, setDate] = useState(new Date());
  const [calendar, toggleCalendar] = useState(false);
  const { user, modal, closeModal } = useContext(GlobalContext);

  const onClose = () => {
    toggleCalendar();
    closeModal();
  };

  const onDateSelect = (date) => {
    setDate(date);
    // toggleCalendar();
  };

  console.log(date);

  return (
    user && (
      <>
        <Modal isOpen={modal}>
          <ModalHeader toggle={() => onClose()} charCode='X'>
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
          {calendar && (
            <div className='d-flex justify-content-center my-3'>
              <Calendar
                onChange={(date) => onDateSelect(date)}
                value={date}
                minDate={new Date()}
              />
            </div>
          )}
          <ModalFooter>
            {!calendar ? (
              <Button
                color='primary'
                onClick={() => toggleCalendar(!calendar ? true : false)}
              >
                Open Calendar
              </Button>
            ) : (
              <>
                <Button
                  color='primary'
                  onClick={() => toggleCalendar(!calendar ? true : false)}
                >
                  Book a slot
                </Button>
                <Button
                  color='danger'
                  outline
                  onClick={() => toggleCalendar(!calendar ? true : false)}
                >
                  Close
                </Button>
              </>
            )}
          </ModalFooter>
        </Modal>
      </>
    )
  );
};

export default UserModal;
