import React from "react";
import Stack from 'react-bootstrap/Stack';
import VisiblePageNumbers from './paginationButtons/VisiblePageNumbers';
import PreviousPageButton from './paginationButtons/PreviousPageButton';
import NextPageButton from './paginationButtons/NextPageButton';
import FirstPageButton from './paginationButtons/FirstPageButton';
import LastPageButton from './paginationButtons/LastPageButton';

function Pagination({ setCurrent, currentPage, numOfPages }) {

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
          <VisiblePageNumbers
            setCurrent={setCurrent}
            currentPage={currentPage}
            pages={numOfPages}
          />
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