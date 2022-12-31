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
  const [sortingOrder, setSortingOrder] = useState('');
  const [sortingIconPosition, setSortingIconPosition] = useState('sort');

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

  const sort = (args) => {
    setSortingOrder(args)
    if(args === 'asc') {
      setSortingIconPosition('caret-down')
    } else {
      setSortingIconPosition('caret-up')
    }
  }

  useEffect(() => {
    let newList
    const endpoint = searchString ? urlWithSearchParams + searchString + '?fullText=true' : urlForAllResults
    const getCountryList = () => {
      fetch(endpoint)
        .then((response) => response.json())
        .then(data => {
          if(data.length > 0){
            if(sortingOrder === 'asc') {
              newList = data.sort(
                (p1, p2) =>
                (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
              )
              setCountries(newList)
              setLoading(false)
            } else if (sortingOrder === 'desc') {
              newList = data.sort(
                (p1, p2) =>
                (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
              )
              setCountries(newList)
              setLoading(false)
            } else {
              setCountries(data)
              setLoading(false)
            }
          } else if (data.status === 404) {
            setLoading(false)
            console.log('no result')
          }
        })
    }

    getCountryList()

  }, [searchString, countries, currentPage, recordsPerPage, sortingOrder]);

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
      {currentRecords && currentRecords.length > 0 && (
        <>
          <Listing countries={currentRecords} sort={sort} icon={sortingIconPosition}/>
          <Pagination
            onClick={setCurrent}
            currentPage={currentPage}
            numOfPages={nPages}
            maxVisible={totalVisiblePageNumbers}
          />
        </>
      )}
      {!currentRecords.length && !loading && (
        <Alert variant="info" className="text-center">
          Sorry your search yields no result! Check that you spelled the name of the country in full with no typo-error!
        </Alert>
      )}
    </div>
  );
}

export default Home;