import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import FetchPlanetsApi from '../services/FetchPlanetsApi';
import FiltersInput from './FiltersInput';

function Table() {
  const {
    listPlanets,
    nameFilter,
    setNameFilter,
    filtersNumericValues,
  } = useContext(PlanetContext);

  function handleNameSearch({ target }) {
    const { value } = target;
    setNameFilter(value);
  }

  const planetasFiltrados = listPlanets
    .filter((planeta) => planeta.name.toLowerCase().includes(nameFilter));

  const filterConcat = (array, column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      return array.filter((planet) => planet[column] * 1 > value);
    case 'menor que':
      return array.filter((planet) => planet[column] * 1 < value);
    case 'igual a':
      return array.filter((planet) => planet[column] === value);
    default:
      return array;
    }
  };

  const filtersCombined = (array, arrayFilter) => {
    if (arrayFilter !== undefined && arrayFilter.length > 0) {
      let currArray = array;
      let newArray = [];

      arrayFilter.forEach((filter) => {
        const coluna = filter.column;
        const match = filter.comparison;
        const valor = filter.value;
        newArray = filterConcat(currArray, coluna, match, valor);
        currArray = newArray;
      });
      return newArray;
    } return array;
  };

  const finalFilteredPlanets = filtersCombined(planetasFiltrados, filtersNumericValues);

  return (
    <>
      <FetchPlanetsApi />
      <FiltersInput />
      <input
        type="text"
        value={ nameFilter }
        onChange={ handleNameSearch }
        data-testid="name-filter"
      />
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Gravity</th>
            <th>Diameter</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {finalFilteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>{planet.population}</td>
              <td>{planet.gravity}</td>
              <td>{planet.diameter}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.films.join(', ')}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default Table;
