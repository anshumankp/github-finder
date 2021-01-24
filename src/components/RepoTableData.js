import React from 'react';

import { Button, Image } from 'react-bootstrap';
import UserModal from './Modal';

const RepoTableData = ({ repo }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const { name, description, owner, updated_at, created_at } = repo;
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{description ?? 'Description not available for this repo'}</td>
        <td onClick={() => setModalShow(true)}>{owner.login}</td>
      </tr>
    </>
  );
};

export default RepoTableData;
