import { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function FetchPlanetsApi() {
  const { setListPlanets } = useContext(PlanetContext);
  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      const planetasFiltrados = results.map((planeta) => {
        const { residents, ...planetData } = planeta;
        return planetData;
      });
      setListPlanets(planetasFiltrados);

      return planetasFiltrados;
    };
    fetchPlanets();
  }, [setListPlanets]);
}

export default FetchPlanetsApi;
