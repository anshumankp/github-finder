import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GitContext = React.createContext();

const GitProvider = props => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [count, setCount] = useState();
  const [endpoint, setEndpoint] = useState('users');
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setError(null);

    setPage(1);
    if (query === '') {
      setUsers([]);
      setRepos([]);
      return;
    }

    query && setLoading(true);
    query &&
      axios
        .get(`https://api.github.com/search/${endpoint}`, {
          params: {
            q: query,
            client_id: process.env.REACT_APP_GIT_CLIENT_ID,
            client_secret: process.env.REACT_APP_GIT_CLIENT_SECRET,
            page: page,
            per_page: 9
          }
        })
        .then(res => {
          console.log(res);

          setCount(res.data.total_count);

          if (endpoint === 'users') {
            setUsers(res.data.items);
            console.log(res.data.items);
          } else if (endpoint === 'repositories') {
            setRepos(res.data.items);
            console.log(res.data.items);
          }
          if (res.data.total_count > page * 9) {
            setHasNextPage(true);
            console.log(hasNextPage);
          } else {
            setHasNextPage(false);
          }

          if (res.data.total_count === 0) {
            setError({
              msg: `Sorry, we could not find any git ${
                endpoint === 'repositories' ? 'repo' : 'user'
              } with that name :(`
            });
            console.log(error);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(
            `Sorry, there's an error with the github api (request rate limite exceeded). Please try again after sometime.`
          );
          setLoading(false);
        });
  }, [query, endpoint]);

  useEffect(() => {
    setError(null);

    query && setLoading(true);
    query &&
      axios
        .get(`https://api.github.com/search/${endpoint}`, {
          params: {
            q: query,
            client_id: process.env.REACT_APP_GIT_CLIENT_ID,
            client_secret: process.env.REACT_APP_GIT_CLIENT_SECRET,
            page: page,
            per_page: 9
          }
        })
        .then(res => {
          console.log(res);

          setCount(res.data.total_count);
          if (endpoint === 'users') {
            setUsers(res.data.items);
            console.log(res.data.items);
          } else if (endpoint === 'repositories') {
            setRepos(res.data.items);
            console.log(res.data.items);
          }
          if (res.data.total_count > page * 9) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          if (res.data.total_count === 0) {
            setError({
              msg: `Sorry, we could not find any git ${
                endpoint === 'repositories' ? 'repo' : 'user'
              } with that name :(`
            });
          }
          setLoading(false);
        })
        .catch(err => {
          setError(
            `Sorry, there's an error with the github api (request rate limite exceeded). Please try again after sometime.`
          );
          setLoading(false);
        });
  }, [page, endpoint]);

  return (
    <GitContext.Provider
      value={{
        query,
        setQuery,
        page,
        setPage,
        loading,
        setLoading,
        users,
        setUsers,
        error,
        setError,
        hasNextPage,
        setHasNextPage,
        repos,
        setRepos,
        endpoint,
        setEndpoint,
        count
      }}
    >
      {props.children}
    </GitContext.Provider>
  );
};

export { GitProvider, GitContext };
