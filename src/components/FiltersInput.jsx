import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function FiltersInput() {
  const {
    listPlanets,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    handleFiltros,
  } = useContext(PlanetContext);

  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const setOptions = () => {
    const setOptionMap = options.map((option) => (
      <option
        key={ option }
        value={ option }
      >
        {option}
      </option>
    ));
    return setOptionMap;
  };

  useEffect(() => {}, [listPlanets]);

  return (
    <div>
      <label htmlFor="column-filter">
        Coluna:
        <select
          id="column-filter"
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (event) => {
            setColumnFilter(event.target.value);
          } }
        >
          {
            setOptions()
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ (event) => {
            setComparisonFilter(event.target.value);
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          id="value-filter"
          data-testid="value-filter"
          type="number"
          value={ valueFilter }
          onChange={ (event) => {
            setValueFilter(event.target.value);
          } }
        />
      </label>
      <button
        id="button-filter"
        data-testid="button-filter"
        onClick={ handleFiltros }
      >
        Aplicar filtros
      </button>
    </div>
  );
}

export default FiltersInput;
