import { useEffect, useState, useCallback, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { GitContext } from '../ContextProvider';

const COMMANDS = {
  SEARCH_USER: 'search-users',
  SEARCH_REPOSITORY: 'search-repositories'
};

const useAlan = () => {
  const [alanInstance, setAlanInstance] = useState();
  const { setQuery, setEndpoint } = useContext(GitContext);

  
  const searchUsers = useCallback(
    ({ detail: { endpoint, query } }) => {
      alanInstance.playText(`Showing search results for ${endpoint} ${query} `);
      setEndpoint(endpoint);
      setQuery(query);
    },
    [alanInstance]
  );

  useEffect(() => {
    window.addEventListener(COMMANDS.SEARCH_USER, searchUsers);
    window.addEventListener(COMMANDS.SEARCH_REPOSITORY, searchUsers);
    return () => {
      window.removeEventListener(COMMANDS.SEARCH_USER, searchUsers);
      window.removeEventListener(COMMANDS.SEARCH_REPOSITORY, searchUsers);
    };
  }, [searchUsers]);

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
