import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [table, setTable] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [numberFilter, setNumberFilter] = useState([]);

  return (
    <PlanetContext.Provider
      value={ {
        listPlanets,
        setListPlanets,
        table,
        setTable,
        nameFilter,
        setNameFilter,
        numberFilter,
        setNumberFilter,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default PlanetProvider;
