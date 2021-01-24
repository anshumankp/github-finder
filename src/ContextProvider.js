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
  const [endpoint, setEndpoint] = useState('repositories');
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
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
            per_page: 15
          }
        })
        .then(res => {
          console.log(res);
          setError(null);
          setCount(res.data.total_count);

          if (endpoint === 'users') {
            setUsers(res.data.items);
          } else if (endpoint === 'repositories') {
            setRepos(res.data.items);
            console.log(res.data.items);
          }
          if (res.data.total_count > page * 15) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError(err);
          setLoading(false);
        });
  }, [query, endpoint]);

  useEffect(() => {
    query && setLoading(true);
    query &&
      axios
        .get(`https://api.github.com/search/${endpoint}`, {
          params: {
            q: query,
            client_id: process.env.REACT_APP_GIT_CLIENT_ID,
            client_secret: process.env.REACT_APP_GIT_CLIENT_SECRET,
            page: page,
            per_page: 15
          }
        })
        .then(res => {
          console.log(res);
          setError(null);
          setCount(res.data.total_count);
          if (endpoint === 'users') {
            setUsers(res.data.items);
          } else if (endpoint === 'repositories') {
            setRepos(res.data.items);
            console.log(res.data.items);
          }
          if (res.data.total_count > page * 15) {
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err);
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
