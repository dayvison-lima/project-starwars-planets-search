import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [nameFilter, setNameFilter] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtros, setFiltros] = useState([]);
  const [atualizaFiltros, setAtualizaFiltros] = useState(false);

  const handleFiltros = useCallback(() => {
    if (comparisonFilter === 'maior que') {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] * 1 > valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
    } else if (comparisonFilter === 'menor que') {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] * 1 < valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
    } else {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] === valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
    }
  }, [columnFilter, comparisonFilter, valueFilter, filtros, listPlanets]);

  const values = useMemo(() => ({
    listPlanets,
    setListPlanets,
    apiData,
    setApiData,
    nameFilter,
    setNameFilter,
    filteredPlanets,
    setFilteredPlanets,
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
    handleFiltros,
  }), [listPlanets,
    setListPlanets,
    apiData,
    setApiData,
    nameFilter,
    setNameFilter,
    filteredPlanets,
    setFilteredPlanets,
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
    handleFiltros]);

  return (
    <PlanetContext.Provider
      value={ values }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default PlanetProvider;
