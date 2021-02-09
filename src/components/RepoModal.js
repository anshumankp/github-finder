import React from 'react';
import { Modal, Image, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';

const RepoModal = props => {
  const { repo } = props;

  return (
    <Modal {...props} size='md' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {repo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-muted text-center px-2'>
          {repo.description
            ? repo.description.length > 250
              ? repo.description.substring(0, 250) + ' . . . .'
              : repo.description
            : 'Description not available for this repo'}
        </p>
        <ListGroup className='p-2 m-2'>
          <ListGroupItem>
            Owner:{' '}
            <Image
              className='mx-1'
              style={{
                borderRadius: '50%',
                height: '20px',
                width: '20px'
              }}
              src={repo.owner.avatar_url}
            />
            <a href={repo.owner.html_url} target='_blank'>
              {repo.owner.login}
            </a>
          </ListGroupItem>

          <ListGroupItem>
            Repo Link: <i className='fab fa-github mr-1'></i>
            <a href={repo.html_url} target='_blank'>
              {repo.name}
            </a>
          </ListGroupItem>
          {repo.homepage && (
            <ListGroupItem>Homepage: {repo.homepage}</ListGroupItem>
          )}
          {repo.language && (
            <ListGroupItem className='text-capitalize'>
              Language: {repo.language}
            </ListGroupItem>
          )}
          {repo.created_at && (
            <ListGroupItem>
              Created : {repo.created_at.substring(0, 10)}
            </ListGroupItem>
          )}
          {repo.pushed_at && (
            <ListGroupItem>
              Last Push: {repo.pushed_at.substring(0, 10)}
            </ListGroupItem>
          )}
        </ListGroup>
        <h4 className='text-center'>
          <Badge className='mx-2' variant='secondary'>
            Forks: {repo.forks}
          </Badge>

          <Badge className='mx-2' variant='info'>
            Watchers: {repo.watchers}
          </Badge>
        </h4>
      </Modal.Body>
    </Modal>
  );
};

export default RepoModal;
