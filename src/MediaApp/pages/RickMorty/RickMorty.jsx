import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Gallery } from './components/Gallery';
import { Info } from './components/Info';
import axios from 'axios';

const RickMorty = () => {
  const [infoCharater, setInfoCharater] = useState(null);
  const [category, setCategory] = useState('Characters');
  const [data, setData] = useState();

  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character/');
  }, []);

  const fetchData = async (url, newCategory = 'Characters') => {
    try {
      let res = await axios.get(url);
      setData(res.data);
      setCategory(newCategory);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <Container>
        <h2 className="text-4xl font-black mb-8 text-center tracking-tighter">
          RICK & MORTY <span className="text-green-400 uppercase">{category}</span>
        </h2>

        {/* Buttons Section */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {[
            { label: 'Characters', url: 'https://rickandmortyapi.com/api/character', color: 'from-green-500 to-emerald-700' },
            { label: 'Locations', url: 'https://rickandmortyapi.com/api/location', color: 'from-blue-500 to-indigo-700' },
            { label: 'Episodes', url: 'https://rickandmortyapi.com/api/episode', color: 'from-purple-500 to-pink-700' }
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => fetchData(btn.url, btn.label)}
              className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                category === btn.label 
                ? `bg-gradient-to-br ${btn.color} ring-2 ring-white scale-105` 
                : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 shadow-2xl">
          <Row>
            <Gallery 
              data={data} 
              updateData={fetchData} 
              setInfoCharater={setInfoCharater} 
              category={category} 
            />
          </Row>
        </div>

        {infoCharater && (
          <Info infoCharater={infoCharater} setInfoCharater={setInfoCharater} />
        )}
      </Container>
    </div>
  );
};

export default RickMorty;