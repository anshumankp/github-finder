import React from 'react';
import './Cards.css';

import { Button } from 'react-bootstrap';
import UserModal from './UserModal';
import RepoModal from './RepoModal';

const RepoData = ({ repo }) => {
  const [userModalShow, setUserModalShow] = React.useState(false);
  const [repoModalShow, setRepoModalShow] = React.useState(false);
  const { name, description, owner, updated_at, created_at } = repo;
  return (
    <>
      {userModalShow && (
        <UserModal
          show={userModalShow}
          onHide={() => setUserModalShow(false)}
          userid={owner.login}
        />
      )}
      {repoModalShow && (
        <RepoModal
          show={repoModalShow}
          onHide={() => setRepoModalShow(false)}
          repo={repo}
        />
      )}
      <div className='card-repo text-center '>
        <div className='card-repo-header p-1'>
          <img className='card-repo-thumbnail' src={owner.avatar_url} />
          <div className='card-repo-username mx-2'> {owner.login}</div>

          <i
            className='fas fa-info-circle fa-2x ml-auto'
            onClick={() => setUserModalShow(true)}
          ></i>
        </div>
        <div className='card-repo-body p-1'>
          <h4>
            {name.length > 15 ? name.substring(0, 15) + ' . . . .' : name}
          </h4>
          <p className='text-muted'>
            {description
              ? description.length > 50
                ? description.substring(0, 50) + ' . . . .'
                : description
              : 'Description not available for this repo'}
          </p>{' '}
        </div>
        <div className='card-repo-footer'>
          <Button
            block
            variant='outline-secondary '
            onClick={() => setRepoModalShow(true)}
          >
            More
          </Button>
        </div>
      </div>
    </>
  );
};

export default RepoData;
