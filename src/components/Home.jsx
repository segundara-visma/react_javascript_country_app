import React, { useState, useEffect } from "react";
import Header from "./Header";
import Listing from "./Listing";
import Pagination from "./Pagination";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function Home() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [totalVisiblePageNumbers] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const urlForAllResults = "https://restcountries.com/v3.1/all";
  const urlWithSearchParams = "https://restcountries.com/v3.1/name/";

  const showSearchResult = (searchString) => {
    setLoading(true)
    setCountries([])
    setCurrentPage(1)
    setSearchString(searchString.toLowerCase())
  };

  const setCurrent = (curr) => setCurrentPage(curr);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = countries && countries.length ? countries.slice(indexOfFirstRecord, indexOfLastRecord) : [];
  const nPages = Math.ceil(countries.length / recordsPerPage)

  useEffect(() => {
    const endpoint = searchString ? urlWithSearchParams + searchString + '?fullText=true' : urlForAllResults
    const getCountryList = () => {
      fetch(endpoint)
        .then((response) => response.json())
        .then(data => {
          setCountries(data)
          setLoading(false)
        })
    }
    getCountryList()
  }, [searchString]);

  return (
    <div className="container mt-3">
      <h1>Country List</h1>
      <Header showSearchResult={showSearchResult} />
      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {currentRecords.length > 0 && (
        <>
          <Listing countries={currentRecords}/>
          <Pagination
            setCurrent={setCurrent}
            currentPage={currentPage}
            numOfPages={nPages}
            totalVisiblePageNumbers={totalVisiblePageNumbers}
          />
        </>
      )}
      {!currentRecords.length && !loading && (
        <Alert variant="info" className="text-center">
          Sorry your search yields no result!
        </Alert>
      )}
    </div>
  );
}

export default Home;