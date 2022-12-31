import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Listing({countries, sort, icon}) {

  const [order, setOrder] = useState('asc');

  const reSetOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
    sort(order)
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Flag</th>
          <th onClick={() => reSetOrder()}>Name <i className={`fa fa-${icon}`}></i></th>
          <th>Region</th>
          <th>Population</th>
          <th>Languages</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, key) => (
          <tr key={key}>
            <td>{country.flag}</td>
            <td>{country.name.common}</td>
            <td>{country.region}</td>
            <td>{country.population}</td>
            <td>{country.languages ? (
              <ul>{(Object.values(country.languages)).map((item, key) => (
                <li key={key}>{item}</li>))}
              </ul>
            ) : null}
            </td>
            <td>
              <Link to={`/details/${country.name.common}`}>
                <Button variant="light" data-cy={`detailsBtn-${country.name.common}`}>
                  <i className="fa fa-angle-right"></i>
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Listing;