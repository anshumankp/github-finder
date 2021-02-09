import React, { useContext } from 'react';
import { GitContext } from '../ContextProvider';

import Paginate from './Paginate';

import UserData from './UserData';
import RepoData from './RepoData';

const SearchResults = () => {
  const { users, page, repos, loading, endpoint, count } = useContext(
    GitContext
  );
  return (
    <>
      {!loading && endpoint === 'users' && users.length > 0 && (
        <>
          <Paginate />
          <p className='text-center'>
            {count <= 9
              ? `Showing 1 - ${count} out of ${count} matches`
              : `Showing ${(page - 1) * 9 + 1} - ${page *
                  9} out of ${count} matches`}
          </p>
          <div className='card-deck-user'>
            {users.map(user => {
              return <UserData key={user.id} user={user} />;
            })}
          </div>
        </>
      )}

      {!loading && endpoint === 'repositories' && repos.length > 0 && (
        <>
          <Paginate />
          <p className='text-center'>
            {count <= 9
              ? `Showing 1 - ${count} out of ${count} matches`
              : `Showing ${(page - 1) * 9 + 1} - ${page *
                  9} out of ${count} matches`}
          </p>
          <div className='card-deck-repo'>
            {repos.map(repo => {
              return <RepoData key={repo.id} repo={repo} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SearchResults;
