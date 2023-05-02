import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function RowsTable() {
  const {
    listPlanets,
    nameFilter,
    numberFilter,
  } = useContext(PlanetContext);

  const planetsNameFiltered = listPlanets
    .filter((planet) => planet.name.includes(nameFilter));

  const filtros = (array, collumn, match, value) => {
    switch (match) {
    case 'menor que':
      return array.filter((planet) => planet[collumn] * 1 < value);
    case 'maior que':
      return array.filter((planet) => planet[collumn] * 1 > value);
    case 'igual a':
      return array.filter((planet) => planet[collumn] * 1 === value);
    default:
      return array;
    }
  };
  const filteredList = (array, filterArray) => {
    if (filterArray !== undefined && filterArray.length > 0) {
      let currArray = array;
      let newArray = [];
      filterArray.forEach((filter) => {
        const { collumn } = filter;
        const match = filter.comparison;
        const { value } = filter;
        newArray = filtros(currArray, collumn, match, value);
        currArray = newArray;
      });
      return newArray;
    }
    return array;
  };

  const planetsFiltered = filteredList(planetsNameFiltered, numberFilter);

  const tableRows = () => planetsFiltered.map((planet, index) => (
    <tr key={ index }>
      <td>{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.residents}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      {/* <td>{planet.edited}</td> */}
      <td>{planet.url}</td>
    </tr>
  ));

  return (
    <tbody>
      {tableRows()}
    </tbody>
  );
}

export default RowsTable;
