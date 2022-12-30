import React from 'react'
import Button from 'react-bootstrap/Button';

function RenderPageNumbers({setCurrent, currentPage, pages, numOfVisibleButtons}) {
    let visiblePages = [];
    const midCeil = Math.ceil(numOfVisibleButtons / 2)
    const numOfButtonsToRight = Math.floor(numOfVisibleButtons / 2)
    const numOfButtonsToLeft = numOfVisibleButtons % 2 === 1 ? numOfVisibleButtons - midCeil : numOfVisibleButtons - midCeil - 1
    const upperLimit = currentPage <= midCeil ? numOfVisibleButtons : (currentPage > midCeil && currentPage + midCeil < pages + 1 ? currentPage + numOfButtonsToRight : pages)
    const lowerLimit = currentPage > pages - midCeil ? pages - numOfVisibleButtons + 1 : (currentPage <= pages - midCeil && currentPage > midCeil ? currentPage - numOfButtonsToLeft : 1)

    for (let i = lowerLimit; i <= upperLimit; i++) {
        visiblePages.push(
            <span key={i} style={{ marginLeft: "2px", marginRight: "2px" }}>
                {i === currentPage ? (
                    <Button variant="secondary" disabled>
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