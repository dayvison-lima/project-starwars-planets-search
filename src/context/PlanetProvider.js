import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  return (
    <PlanetContext.Provider
      value={ {
        listPlanets,
        setListPlanets,
        nameFilter,
        setNameFilter,
        filteredPlanets,
        setFilteredPlanets,
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
