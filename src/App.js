import React, { useState, useContext, useCallback } from 'react';
import { GitContext } from './ContextProvider';

import { Container, Form, InputGroup, Table } from 'react-bootstrap';
import Paginate from './components/Paginate';
import Loader from './components/Loader';

import Typewriter from 'typewriter-effect';
import debounce from 'lodash/debounce';

import UserTableData from './components/UserTableData';
import RepoTableData from './components/RepoTableData';
import './App.css';

const App = () => {
  const {
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
            placeholder={
              endpoint === 'users'
                ? 'Search for a github user..'
                : 'Search for a github repository...'
            }
            onChange={e => handleSearch(e)}
          />
        </InputGroup>
        <InputGroup size='lg' className='mb-4'>
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
        {error && (
          <p className='text-danger'>
            Sorry, Git API request limit reached. Please try after some time.
          </p>
        )}
        {endpoint === 'users' &&
          (users.length > 0 ? (
            <>
              <Paginate />
              <p>
                {count <= 5
                  ? `Showing 1 - ${count} out of ${count} matches`
                  : `Showing ${(page - 1) * 5 + 1} - ${page *
                      5} out of ${count} matches`}
              </p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>User</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    return <UserTableData key={user.id} user={user} />;
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            !loading &&
            !error &&
            (!value ? (
              <div>
                It's quite lonely in here. Type something above to GIT the user
                you're looking for ;)
              </div>
            ) : (
              <p>Sorry, no such git user found</p>
            ))
          ))}

        {endpoint === 'repositories' &&
          (repos.length > 0 ? (
            <>
              <Paginate />
              <p>
                {count <= 5
                  ? `Showing 1 - ${count} out of ${count} matches`
                  : `Showing ${(page - 1) * 5 + 1} - ${page *
                      5} out of ${count} matches`}
              </p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Repository Name</th>
                    <th>Description</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.map(repo => {
                    return <RepoTableData key={repo.id} repo={repo} />;
                  })}
                </tbody>
              </Table>
            </>
          ) : (
            !loading &&
            !error &&
            (!value ? (
              <div>
                It's quite lonely in here. Type something above to GIT the repo
                you're looking for ;)
              </div>
            ) : (
              <p>Sorry, no such git repository found</p>
            ))
          ))}
      </Container>
    </>
  );
};

export default App;
