import React from 'react';

import { Button } from 'react-bootstrap';
import UserModal from './Modal';

const UserTableData = ({ user }) => {
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
      <tr>
        <td className='m-auto'>
          <img
            style={{
              height: '100px',
              width: '100px'
            }}
            src={user.avatar_url}
            alt='User Thumbnail'
          />
        </td>
        <td onClick={() => setModalShow(true)}>{user.login}</td>
        <td>
          <Button
            variant='outline-secondary'
            onClick={() => setModalShow(true)}
          >
            More Info
          </Button>
        </td>
      </tr>
    </>
  );
};

export default UserTableData;
