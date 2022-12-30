import React from 'react'
import Button from 'react-bootstrap/Button';

const renderFirstButton = ({setCurrent, currentPage}) => {
    return (
      <>
        {currentPage > 1 ? (
          <Button
            variant="outline-secondary"
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => setCurrent(1)}
          >
            <i className="fa fa-angle-double-left"></i>
          </Button>
        ) : (
          <Button variant="outline-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
            <i className="fa fa-angle-double-left"></i>
          </Button>
        )}
      </>
    );
}
export default renderFirstButton;