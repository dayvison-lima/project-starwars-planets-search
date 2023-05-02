import React from 'react';
import HeaderTable from './HeaderTable';
import RowsTable from './RowsTable';
import FetchPlanetsApi from '../services/FetchPlanetsApi';

function Table() {
  return (
    <table>
      <FetchPlanetsApi />
      <HeaderTable />
      <RowsTable />
    </table>
  );
}

export default Table;
