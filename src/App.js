import React, { useState, useContext, useEffect, useRef } from 'react';
import { GitContext } from './ContextProvider';

import { Container } from 'react-bootstrap';

import useAlan from './components/useAlan';

import Navbar from './components/Navbar';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import EndpointSwitchButtons from './components/EndpointSwitchButtons';
import Loader from './components/Loader';
import SearchResults from './components/SearchResults';
import FallbackMessage from './components/FallbackMessage';
import Footer from './components/Footer';

import './App.css';
import Error from './components/Error';

const App = () => {
  const { loading, error } = useContext(GitContext);
  const [searchBoxValue, setSearchBoxValue] = useState('');
  let searchResultsRef = useRef();

  useEffect(() => {
    if (searchResultsRef.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: searchResultsRef.current.offsetTop
      });
    }
  }, [loading]);

  useAlan();

  return (
    <>
      <Navbar />
      <Container>
        <Header />
        <SearchBox
          searchBoxValue={searchBoxValue}
          setSearchBoxValue={setSearchBoxValue}
        />
        <div ref={searchResultsRef}>
          <EndpointSwitchButtons />

          {loading && <Loader />}
          {error && <Error message={error.msg} />}

          {!error && <SearchResults />}

          {!searchBoxValue && (
            <FallbackMessage searchBoxValue={searchBoxValue} />
          )}
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default App;
