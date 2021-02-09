import React, { useContext, useCallback, useEffect } from 'react';

import { InputGroup, Form } from 'react-bootstrap';
import { GitContext } from '../ContextProvider';
import debounce from 'lodash/debounce';

const SearchBox = ({ searchBoxValue, setSearchBoxValue }) => {
  const { setQuery, endpoint, query } = useContext(GitContext);

  useEffect(() => {
    setSearchBoxValue(query);
  }, [query, setSearchBoxValue]);

  const debouncedSearch = useCallback(
    debounce(nextValue => setQuery(nextValue), 500),
    []
  );

  const handleSearch = event => {
    const { value: nextValue } = event.target;
    setSearchBoxValue(nextValue);
    debouncedSearch(nextValue);
  };

  return (
    <InputGroup className='my-4 search-group'>
      <InputGroup.Text className='bg-transparent search-icon'>
        <i className='fa fa-search' />
      </InputGroup.Text>
      <Form.Control
        size='lg'
        type='text'
        name='searchQuery'
        className='custom-search-box'
        value={searchBoxValue}
        spellCheck='false'
        autoComplete='off'
        placeholder={`Search github ${endpoint}...`}
        onChange={e => handleSearch(e)}
      />
      {searchBoxValue && (
        <InputGroup.Text className='bg-transparent clear-icon'>
          <i
            onClick={() => {
              setSearchBoxValue('');
              setQuery('');
            }}
            className='fas fa-times'
          />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
};

export default SearchBox;
