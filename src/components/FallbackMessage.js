import React, { useContext } from 'react';

import { GitContext } from '../ContextProvider';

const FallbackMessage = () => {
  const { users, repos, loading, error, endpoint } = useContext(GitContext);
  return (
    <>
      {!loading && !error && !repos.length && !users.length && (
        <h3 className='text-center'>
          {`Type something above to GIT the ${endpoint} you're looking for :)`}
        </h3>
      )}
    </>
  );
};

export default FallbackMessage;
