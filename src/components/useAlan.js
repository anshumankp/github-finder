import { useEffect, useState, useCallback, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { GitContext } from '../ContextProvider';

const COMMANDS = {
  SEARCH_USER: 'search-users',
  SEARCH_REPOSITORY: 'search-repositories',
  CHANGE_PAGE: 'change-page'
};

const useAlan = () => {
  const [alanInstance, setAlanInstance] = useState();
  const { setQuery, setEndpoint, page, setPage, hasNextPage } = useContext(
    GitContext
  );

  const updateState = (query, endpoint) => {
    setEndpoint(endpoint);
    setQuery(query);
  };

  const search = useCallback(
    ({ detail: { endpoint, query } }) => {
      alanInstance.playText(`Showing search results for ${endpoint} ${query} `);
      console.log(query);
      updateState(query, endpoint);
    },
    [alanInstance, setEndpoint, setQuery, updateState]
  );

  const changePage = useCallback(
    ({ detail: { page_num } }) => {
      if (page === 1 && page_num === 'previous') {
        alanInstance.playText("You're already on the first page");
        return;
      }
      console.log(hasNextPage);
      if (!hasNextPage && page_num === 'next') {
        alanInstance.playText(`You're on the last page `);
        return;
      }
      if (page_num === 'next') setPage(page + 1);
      if (page_num === 'previous') setPage(page - 1);
    },
    [alanInstance, setPage, hasNextPage, page]
  );

  useEffect(() => {
    window.addEventListener(COMMANDS.SEARCH_USER, search);
    window.addEventListener(COMMANDS.SEARCH_REPOSITORY, search);
    window.addEventListener(COMMANDS.CHANGE_PAGE, changePage);
    return () => {
      window.removeEventListener(COMMANDS.SEARCH_USER, search);
      window.removeEventListener(COMMANDS.SEARCH_REPOSITORY, search);
      window.removeEventListener(COMMANDS.CHANGE_PAGE, changePage);
    };
  }, [search, changePage]);

  useEffect(() => {
    if (alanInstance != null) return;
    setAlanInstance(
      alanBtn({
        key: process.env.REACT_APP_ALAN_KEY,
        onCommand: ({ command, payload }) => {
          if (payload) {
            console.log(command, payload);
            window.dispatchEvent(new CustomEvent(command, { detail: payload }));
          }
        }
      })
    );
  }, []);
  return null;
};

export default useAlan;
