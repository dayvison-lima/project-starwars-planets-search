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
    columnFilterOptions,
    handleRemove,
    filtros,
    handleOneRemove,
  } = useContext(PlanetContext);

  const setOptions = () => {
    const setOptionMap = columnFilterOptions.map((option) => (
      <option
        key={ option }
        value={ option }
      >
        {option}
      </option>
    ));
    return setOptionMap;
  };

  useEffect(() => {}, [listPlanets, filtros]);

  return (
    <>
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
            {setOptions()}
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemove }
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {
          filtros.length > 0 && (
            filtros.map((filter, index) => (
              <span
                key={ index }
                data-testid="filter"
              >
                <p>
                  {filter.columnFilter ? (
                    `${filter.columnFilter}
                     ${filter.comparisonFilter}
                     ${filter.valueFilter}`
                  ) : (
                    `${filter.columnFilter}`
                  )}
                </p>
                <button
                  type="button"
                  onClick={ () => handleOneRemove(filter.columnFilter) }
                >
                  Remover
                </button>
              </span>
            ))
          )
        }
      </div>

    </>
  );
}

export default FiltersInput;
