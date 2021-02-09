import React, { useContext } from 'react';
import { GitContext } from '../ContextProvider';

import './EndpointSwitchButtons.css';

const EndpointSwitchButtons = () => {
  const { setUsers, setRepos, endpoint, setEndpoint } = useContext(GitContext);

  const reset = () => {
    setUsers([]);
    setRepos([]);
  };

  return (
    <div className='button-group'>
      <button
        onClick={() => {
          reset();
          setEndpoint('users');
        }}
        className={endpoint === 'users' ? 'button active-btn' : 'button'}
      >
        <i className='fas fa-user px-1'></i>Users
      </button>
      <button
        onClick={() => {
          reset();
          setEndpoint('repositories');
        }}
        className={endpoint === 'repositories' ? 'button active-btn' : 'button'}
      >
        <i class='fas fa-laptop-code px-1'></i>Repos
      </button>
    </div>
  );
};

export default EndpointSwitchButtons;
