import React from "react";
import Stack from 'react-bootstrap/Stack';
import VisiblePageNumbers from './paginationButtons/VisiblePageNumbers';
import PreviousPageButton from './paginationButtons/PreviousPageButton';
import NextPageButton from './paginationButtons/NextPageButton';
import FirstPageButton from './paginationButtons/FirstPageButton';
import LastPageButton from './paginationButtons/LastPageButton';

function Pagination({ setCurrent, currentPage, numOfPages, maxVisible }) {

    const numOfVisibleButtons = maxVisible

    return (
        <Stack direction="horizontal">
          <FirstPageButton
            setCurrent={setCurrent}
            currentPage={currentPage}
          />
          <PreviousPageButton
            setCurrent={setCurrent}
            currentPage={currentPage}
          />
          {currentPage > Math.ceil(numOfVisibleButtons / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h"></i>
          )}
          <VisiblePageNumbers
            setCurrent={setCurrent}
            currentPage={currentPage}
            pages={numOfPages}
            numOfVisibleButtons={numOfVisibleButtons}
          />
          {numOfVisibleButtons % 2 === 1 ? (currentPage <= numOfPages - Math.ceil(numOfVisibleButtons / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h"></i>
          ))
          :(currentPage < numOfPages - Math.ceil(numOfVisibleButtons / 2) && numOfPages > maxVisible && (
            <i className="fa fa-ellipsis-h"></i>
          ))}
          <NextPageButton
            setCurrent={setCurrent}
            currentPage={currentPage}
            pages={numOfPages}
          />
          <LastPageButton
            setCurrent={setCurrent}
            currentPage={currentPage}
            pages={numOfPages}
          />
        </Stack>
    );
}

export default Pagination;