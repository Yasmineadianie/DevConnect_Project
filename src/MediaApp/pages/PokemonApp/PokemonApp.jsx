import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PokemonApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
        const detailedPokemons = await Promise.all(
          res.data.results.map(async (p) => {
            const detail = await axios.get(p.url);
            return detail.data;
          })
        );
        setPokemons(detailedPokemons);
      } catch (error) {
        console.log("PokéAPI error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <motion.h2 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-white text-2xl font-bold tracking-tighter"
      >
        CATCHING POKÉMON...
      </motion.h2>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-slate-900 p-8"
    >
      <h1 className="text-4xl font-black text-yellow-400 text-center mb-10 italic tracking-tighter">
        POKÉDEX
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pokemons.map((poke, index) => (
          <motion.div 
            key={poke.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }} // Efecto cascada
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-yellow-400 transition-colors group shadow-xl"
          >
            <div className="aspect-square bg-slate-700 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <span className="absolute top-2 right-2 text-slate-500 font-bold opacity-20 text-4xl">#{poke.id}</span>
              <motion.img 
                whileHover={{ scale: 1.2, rotate: 5 }}
                src={poke.sprites.other['official-artwork'].front_default} 
                alt={poke.name}
                className="w-40 h-40 z-10"
              />
            </div>

            <div className="text-center">
              <p className="text-slate-500 text-xs font-mono">#{poke.id.toString().padStart(3, '0')}</p>
              <h3 className="text-white font-bold text-xl capitalize tracking-wide">{poke.name}</h3>
              <div className="flex gap-2 justify-center mt-3">
                {poke.types.map(t => (
                  <span key={t.type.name} className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-400 text-slate-900">
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PokemonApp;