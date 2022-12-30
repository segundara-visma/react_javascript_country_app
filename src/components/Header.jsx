import React, { useState, useMemo } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import debounce from 'lodash.debounce';

function Header({showSearchResult}) {

  const [searchString, setSearchString] = useState("");

  const searchStringHandler = (e) => {
    setSearchString(e.target.value);
    debouncedChangeHandler(e.target.value)
  };

  const debouncedChangeHandler = useMemo(() => debounce(value =>
    showSearchResult(value), 500), [showSearchResult]
  )

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"><i className="fa fa-bars"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Country</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
                placeholder="Search by country name"
                aria-label="search"
                aria-describedby="basic-addon1"
                onChange={searchStringHandler}
                value={searchString}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;