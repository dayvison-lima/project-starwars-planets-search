import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

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
  const [columnFilterOptions, setColumnFilterOptions] = useState(options);

  const handleFiltros = useCallback(() => {
    console.log(filtros);
    if (comparisonFilter === 'maior que') {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] * 1 > valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
      console.log(filtros);
      const filteredColumns = columnFilterOptions.filter((col) => col !== columnFilter);
      setColumnFilterOptions(filteredColumns);
      setColumnFilter(filteredColumns[0]);
    } else if (comparisonFilter === 'menor que') {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] * 1 < valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
      console.log(filtros);
      const filteredColumns = columnFilterOptions.filter((col) => col !== columnFilter);
      setColumnFilterOptions(filteredColumns);
      setColumnFilter(filteredColumns[0]);
    } else {
      const filtrados = listPlanets
        .filter((planeta) => planeta[columnFilter] === valueFilter);
      setListPlanets(filtrados);
      setFiltros([...filtros, { columnFilter, comparisonFilter, valueFilter }]);
      console.log(filtros);
      const filteredColumns = columnFilterOptions.filter((col) => col !== columnFilter);
      setColumnFilterOptions(filteredColumns);
      setColumnFilter(filteredColumns[0]);
    }
  }, [
    columnFilter,
    comparisonFilter,
    valueFilter,
    filtros,
    listPlanets,
    columnFilterOptions,
  ]);

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
    columnFilterOptions,
    setColumnFilterOptions,
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
    handleFiltros,
    columnFilterOptions,
    setColumnFilterOptions]);

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
