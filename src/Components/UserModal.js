import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import moment from 'moment';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UserModal = () => {
  const [date, setDate] = useState(new Date());
  const [calendar, toggleCalendar] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    user,
    modal,
    errors,
    message,
    closeModal,
    bookSlot,
    clearMessages,
  } = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      clearMessages();
    }, 3000);
  }, [errors, message]);

  const onClose = () => {
    toggleCalendar();
    clearMessages();
    closeModal();
  };

  const onSubmit = async (firstname, email) => {
    setDisabled(true);
    const bookingDate = moment(date).format('L');
    const data = { firstname, email, bookingDate };
    await bookSlot(data);
    setDisabled(false);
  };

  return (
    user && (
      <>
        <Modal isOpen={modal} backdrop>
          <ModalHeader toggle={() => onClose()} charCode='X'>
            Profile
          </ModalHeader>
          <ModalBody>
            {errors && <Alert color='danger'>{errors.error}</Alert>}
            {message && <Alert color='success'>{message}</Alert>}
            <div className='text-center d-flex align-items-center'>
              <img
                src={user.data.avatar}
                width='150px'
                className='rounded-circle mx-4'
                alt='user_image'
              />
              <div className='d-flex flex-column align-items-center text-center m-3'>
                <span className='my-2'>
                  {user.data.first_name} {user.data.last_name}
                </span>
                <span>{user.data.email}</span>
              </div>
            </div>
          </ModalBody>
          {calendar && (
            <div className='d-flex justify-content-center my-3'>
              <Calendar
                onChange={(date) => setDate(date)}
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
                  onClick={() =>
                    onSubmit(user.data.first_name, user.data.email)
                  }
                  disabled={disabled}
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
