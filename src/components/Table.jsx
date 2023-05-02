import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import FetchPlanetsApi from '../services/FetchPlanetsApi';

function Table() {
  const {
    listPlanets,
    nameFilter,
    setNameFilter,
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(PlanetContext);

  function handleNameSearch({ target }) {
    const { value } = target;
    setNameFilter(value);
  }

  useEffect(() => {
    const planetasFiltrados = listPlanets
      .filter((planeta) => planeta.name.toLowerCase().includes(nameFilter));
    setFilteredPlanets(planetasFiltrados);
  }, [listPlanets, nameFilter, filteredPlanets, setFilteredPlanets]);
  return (
    <>
      <FetchPlanetsApi />
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
          {filteredPlanets.map((planet) => (
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
