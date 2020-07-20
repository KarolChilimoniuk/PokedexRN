export const fetchPokemonsList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=964');
  const data = await response.json();
  return data;
};

export const fetchPokemonDetails = async (url, signal) => {
  const response = await fetch(url, {method: 'get', signal});
  const data = await response.json();
  return data;
 };

 export const fetchBerriesList = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/berry');
  const data = await response.json();
  return data;
};

export const fetchBerryDetails = async (url, signal) => {
  const response = await fetch(url, {method: 'get', signal});
  const data = await response.json();
  return data;
 };
