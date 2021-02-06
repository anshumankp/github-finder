import React, { useState, useContext, useCallback, useEffect } from 'react';
import { GitContext } from './ContextProvider';

import { Container, Form, InputGroup } from 'react-bootstrap';
import Paginate from './components/Paginate';
import Loader from './components/Loader';

import Typewriter from 'typewriter-effect';
import debounce from 'lodash/debounce';

import useAlan from './components/useAlan';

import UserData from './components/UserData';
import RepoData from './components/RepoData';
import './App.css';

const App = () => {
  const {
    query,
    setQuery,
    users,
    setUsers,
    page,
    repos,
    setRepos,
    loading,
    error,
    endpoint,
    setEndpoint,
    count
  } = useContext(GitContext);

  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(query);
  }, [query]);
  const debouncedSearch = useCallback(
    debounce(nextValue => setQuery(nextValue), 500),
    []
  );

  const handleSearch = event => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSearch(nextValue);
  };

  const reset = () => {
    setUsers([]);
    setRepos([]);
  };

  useAlan();

  return (
    <>
      <div class='wall-splash'></div>
      <Container>
        <div className='typewriter'>
          <span>
            <i class='fab fa-github'></i>
          </span>
          <Typewriter
            options={{
              strings: ['Users', 'Repos'],
              autoStart: true,
              loop: true
            }}
          ></Typewriter>
        </div>

        <InputGroup className='my-4'>
          <InputGroup.Append>
            <InputGroup.Text className='bg-transparent border-right-0 text-dark'>
              <i className='fa fa-search' />
            </InputGroup.Text>
          </InputGroup.Append>

          <Form.Control
            size='lg'
            type='text'
            name='searchQuery'
            className='border-left-0'
            value={value}
            autoComplete='off'
            placeholder={`Search github ${endpoint}...`}
            onChange={e => handleSearch(e)}
          />
        </InputGroup>
        <InputGroup className='mb-4 justify-content-center'>
          <Form.Check
            inline
            size='lg'
            label='Users'
            type='radio'
            id='users'
            name='endpoint'
            checked={endpoint === 'users'}
            onChange={() => {
              reset();
              setEndpoint('users');
            }}
          />
          <Form.Check
            inline
            label='Repos'
            type='radio'
            id='repos'
            name='endpoint'
            checked={endpoint === 'repositories'}
            onChange={() => {
              reset();
              setEndpoint('repositories');
            }}
          />
        </InputGroup>

        {loading && <Loader />}
        {error && <p className='text-danger'>{error.msg}</p>}
        {endpoint === 'users' && users.length > 0 && (
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

        {endpoint === 'repositories' && repos.length > 0 && (
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

        {!loading && !error && !value && !repos.length && !users.length && (
          <h3>
            {`Type something above to GIT the ${endpoint} you're looking for :)`}
          </h3>
        )}
      </Container>
    </>
  );
};

export default App;
