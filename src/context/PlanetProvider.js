import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filtersNumericValues, setFiltersNumericValues] = useState([{
    collumn: '',
    comparison: '',
    value: 0,

  }]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtros, setFiltros] = useState({});
  const [atualizaFiltros, setAtualizaFiltros] = useState(false);

  return (
    <PlanetContext.Provider
      value={ {
        listPlanets,
        setListPlanets,
        nameFilter,
        setNameFilter,
        filteredPlanets,
        setFilteredPlanets,
        filtersNumericValues,
        setFiltersNumericValues,
        columnFilter,
        setColumnFilter,
        comparisonFilter,
        setComparisonFilter,
        valueFilter,
        setValueFilter,
        filtros,
        setFiltros,
        atualizaFiltros,
        setAtualizaFiltros,
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
