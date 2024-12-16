// src/components/PokemonCard.tsx
import React from 'react';
import './PokemonCard.css'; // Assuming you switch to using a CSS file

// Define the type for the Pokemon prop
interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
