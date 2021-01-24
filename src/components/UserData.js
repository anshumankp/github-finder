import React from 'react';

import { Button } from 'react-bootstrap';
import UserModal from './Modal';

const UserData = ({ user }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      {modalShow && (
        <UserModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          userid={user.login}
        />
      )}
      <div className='card text-center my-2'>
        <img
          className='card-thumbnail'
          src={user.avatar_url}
          alt='User Thumbnail'
        />

        <h4 className='my-2'>{user.login}</h4>
        <div className='my-2'>
          <Button
            variant='outline-secondary'
            onClick={() => setModalShow(true)}
          >
            More
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserData;
