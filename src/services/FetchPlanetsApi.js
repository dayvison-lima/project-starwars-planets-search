import { useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function FetchPlanetsApi() {
  const { setListPlanets, setTable } = useContext(PlanetContext);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const response = await fetch(url);
        const { results } = await response.json();
        if (results.length !== 0 || !results) {
          setListPlanets(results);
          setTable(Object.keys(results[0]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlanets();
  }, [setListPlanets, setTable]);
  return (
    null
  );
}

export default FetchPlanetsApi;
