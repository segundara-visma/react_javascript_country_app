import React, { useState, useEffect } from "react";
import Header from "./Header";
import Listing from "./Listing";
import Pagination from "./Pagination";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import _ from 'lodash'
import { useFetch } from './useFetch'

function Home() {
  const [currentRecords, setCurrentRecords] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [totalVisiblePageNumbers] = useState(5);
  const [sortingOrder, setSortingOrder] = useState('');
  const [sortingIconPosition, setSortingIconPosition] = useState('sort');
  const [nPages, setNPages] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const url = "https://restcountries.com/v3.1/all";

  const {countries,loading,error} = useFetch(url)

  const showSearchResult = (searchString) => {
    setCurrentPage(1)
    setSearchString(searchString.toLowerCase())
  };

  const setCurrent = (curr) => setCurrentPage(curr);

  const sort = (args) => {
    setSortingOrder(args)
    setSortingIconPosition(args === 'asc' ? 'caret-down' : 'caret-up')
  }

  useEffect(() => {
    let newList
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const getCountryList = (countries) => {
      if(sortingOrder === 'asc') {
        newList = countries.sort(
          (p1, p2) =>
          (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? -1 : 0
        )
        const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = countries && countries.length && Math.ceil(countries.length / recordsPerPage);
        setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
        setNPages(nPages)
      } else if (sortingOrder === 'desc') {
        newList = countries.sort(
          (p1, p2) =>
          (p1.name.common.toUpperCase() < p2.name.common.toUpperCase()) ? 1 : (p1.name.common.toUpperCase() > p2.name.common.toUpperCase()) ? -1 : 0
        )
        const currentRecords = newList.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = countries && countries.length && Math.ceil(countries.length / recordsPerPage);
        setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
        setNPages(nPages)
      } else {
        const currentRecords = countries && countries.length && countries.slice(indexOfFirstRecord, indexOfLastRecord);
        const nPages = countries && countries.length && Math.ceil(countries.length / recordsPerPage);
        setCurrentRecords(Array.isArray(currentRecords) ? currentRecords : [])
        setNPages(nPages)
      }
    }

    const filteredData = (data) => {
      const newArray =  _.filter(data, (item) => item.name.common.toLowerCase().startsWith(searchString.toLowerCase()))
      return newArray
    }

    const data = searchString ? filteredData(countries) : countries

    getCountryList(data)

  }, [searchString, countries, sortingOrder, currentPage, recordsPerPage]);

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
      {error && (
        <div className="text-center mt-5">
          <Alert variant="danger" className="text-center">
            {error.message}
          </Alert>
        </div>
      )}
      {currentRecords && currentRecords.length > 0 && !error && (
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
      {currentRecords && !currentRecords.length > 0 && !loading && !error && (
        <div className="text-center mt-5">
          <Alert variant="info" className="text-center">
          {console.log(currentRecords)}
            Sorry your search yields no result!
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Home;