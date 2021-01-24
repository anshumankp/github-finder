import React, { useEffect, useState } from 'react';
import { Modal, Button, Image, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import axios from 'axios';

const UserModal = props => {
  const { userid } = props;
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.github.com/users/${userid}`, {
        params: {
          client_id: process.env.REACT_APP_GIT_CLIENT_ID,
          client_secret: process.env.REACT_APP_GIT_CLIENT_SECRET
        }
      })
      .then(res => {
        console.log(res.data);
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, [userid]);

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>{userid}</Modal.Title>
        </Modal.Header>
        {loading ? (
          <Loader />
        ) : (
          <Modal.Body>
            <Image
              style={{ borderRadius: '50%', height: '250px', width: '250px' }}
              src={userData.avatar_url}
            />
            <h4>{userData.name}</h4>
            <Row>
              <Col>
                {' '}
                <p>
                  {userData.bio ??
                    'This user does not have a bio in their github account.'}
                </p>
              </Col>
            </Row>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;
