import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Image,
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Container
} from 'react-bootstrap';
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
        setLoading(false);
      });
  }, [userid]);

  return (
    <Modal {...props} size='md' centered>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              {userData.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='mb-2 w-50 mx-auto text-center'>
              <Image
                style={{
                  borderRadius: '50%',
                  height: '200px',
                  width: '200px'
                }}
                src={userData.avatar_url}
              />
            </div>
            <h3 className='my-2 w-50 mx-auto text-center'>
              <i className='fab fa-github mr-1'></i>
              <a href={userData.html_url} target='_blank'>
                {userData.login}
              </a>
            </h3>
            <p className='text-muted text-center px-2'>{userData.bio ?? ''}</p>
            <ListGroup className='p-2 m-2'>
              {userData.company && (
                <ListGroupItem className='text-capitalize'>
                  Company: {userData.company.replace('@', '')}
                </ListGroupItem>
              )}
              {userData.location && (
                <ListGroupItem className='text-capitalize'>
                  Location: {userData.location}
                </ListGroupItem>
              )}
              {userData.email && (
                <ListGroupItem>Email: {userData.email}</ListGroupItem>
              )}
              {userData.blog && (
                <ListGroupItem>Website: {userData.blog}</ListGroupItem>
              )}
            </ListGroup>
            <h4 className='text-center'>
              <Badge className='mx-2' variant='secondary'>
                Followers: {userData.followers}
              </Badge>

              <Badge className='mx-2' variant='info'>
                Public Repos: {userData.public_repos}
              </Badge>
            </h4>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
