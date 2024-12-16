import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './App.css';

// Define types for the Pokemon data
interface Pokemon {
  name: string;
  image: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching more data
  const [nextUrl, setNextUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=20'); // URL for the next set of Pokémon data

  // Function to fetch Pokémon data
  const fetchPokemons = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const pokemonData: Pokemon[] = await Promise.all(
        response.data.results.map(async (pokemon: { name: string; url: string }) => {
          const pokeDetails = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: pokeDetails.data.sprites.front_default,
          };
        })
      );
      setPokemons((prev) => [...prev, ...pokemonData]); // Append new Pokémon to the existing list
      setNextUrl(response.data.next); // Update the URL to fetch the next set of Pokémon
    } catch (error) {
      console.error('Error fetching the Pokémon data', error);
    }
    setLoading(false);
  }, []); // useCallback to keep the function reference stable

  useEffect(() => {
    fetchPokemons(nextUrl); // Initial fetch
  }, [fetchPokemons, nextUrl]); // Re-fetch when nextUrl changes

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement; // Type assertion to HTMLElement
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && !loading && nextUrl) {
      fetchPokemons(nextUrl); // Fetch more data when the bottom is reached
    }
  }, [nextUrl, loading, fetchPokemons]); // Dependencies include fetchPokemons

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container" onScroll={handleScroll}>
      <h1>SEARCH ANY POKEMON</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div style={styles.pokemonList}>
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {loading && <div>Loading more Pokémon...</div>}
    </div>
  );
};

const styles: { pokemonList: React.CSSProperties } = {
  pokemonList: {
    display: 'flex',
    flexWrap: 'wrap' as 'nowrap' | 'wrap' | 'wrap-reverse',
    justifyContent: 'center',
  },
};

export default App;
