import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function HeaderTable() {
  const { table } = useContext(PlanetContext);

  const headerColumns = () => {
    const columns = table.filter((col) => col !== 'edited');
    return (
      <tr>
        {
          columns.map((col) => (<th key={ col }>
            {col}
          </th>))
        }
      </tr>
    );
  };
  return (
    <thead>
      {headerColumns()}
    </thead>
  );
}

export default HeaderTable;
