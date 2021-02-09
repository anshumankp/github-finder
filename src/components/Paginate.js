import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { GitContext } from '../ContextProvider';

import './Paginate.css';

const Paginate = () => {
  const { page, setPage, hasNextPage, error } = useContext(GitContext);

  const adjustPage = amount => {
    if (!error) setPage(prevPage => prevPage + amount);
  };
  return (
    <>
      <Pagination className='justify-content-center'>
        {page !== 1 && (
          <Pagination.Prev disabled={error} onClick={() => adjustPage(-1)} />
        )}
        {page !== 1 && (
          <Pagination.Item disabled={error} onClick={() => setPage(1)}>
            1
          </Pagination.Item>
        )}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 2 && (
          <Pagination.Item disabled={error} onClick={() => adjustPage(-1)}>
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && (
          <Pagination.Item disabled={error} onClick={() => adjustPage(1)}>
            {page + 1}
          </Pagination.Item>
        )}
        {hasNextPage && (
          <Pagination.Next disabled={error} onClick={() => adjustPage(1)} />
        )}
      </Pagination>
    </>
  );
};

export default Paginate;
