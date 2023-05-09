import { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function FetchPlanetsApi() {
  const { setListPlanets, setApiData } = useContext(PlanetContext);
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const data = await response.json();
        const { results } = data;
        setListPlanets(results);
        setApiData(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, [setListPlanets, setApiData]);
}

export default FetchPlanetsApi;
