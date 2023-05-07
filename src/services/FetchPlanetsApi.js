import { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function FetchPlanetsApi() {
  const { setListPlanets, setApiData } = useContext(PlanetContext);
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
      setApiData(planetasFiltrados);

      return planetasFiltrados;
    };
    fetchPlanets();
  }, [setListPlanets, setApiData]);
}

export default FetchPlanetsApi;
