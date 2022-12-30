import React from 'react'
import Button from 'react-bootstrap/Button';

function RenderPageNumbers({setCurrent, currentPage, pages}) {
    let visiblePages = [];
    const upperLimit = currentPage + 5 <= pages ? currentPage + 5 : pages
    const lowerLimit = currentPage - 5 >= 1 ? currentPage - 5 : 1
    for (let i = lowerLimit; i <= upperLimit; i++) {
        visiblePages.push(
            <span key={i} style={{ marginLeft: "2px", marginRight: "2px" }}>
                {i === currentPage ? (
                    <Button variant="outline-secondary" disabled>
                        {i}
                    </Button>
                ) : (
                    <Button
                        variant="outline-secondary"
                        style={{ cursor: "pointer" }}
                        onClick={() => setCurrent(i)}
                    >
                        {i}
                    </Button>
                )}
            </span>
        );
    }

    return visiblePages
}

export default RenderPageNumbers;