import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'cf0d7b11528728b4afde1c1305d7d8c8';

export const Form = ({ setForecast }) => {
  const [city, setCity] = useState('');
  const [failMsg, setFailMsg] = useState('');

  const datas = (arrayy) => {
    let timeSearch = arrayy[0].dt_txt.split(' ')[1];
    return arrayy.filter((e) => e.dt_txt.includes(timeSearch));
  };

  const requestForecast = async (ciudad) => {
    if (!ciudad) {
      setFailMsg('Field must be filled');
      return;
    }

    try {
      let res = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast/?q=${ciudad}&units=metric&appid=${apiKey}`
      );
      setFailMsg('');
      setCity('');
      setForecast(datas(res.data.list));
    } catch (error) {
      setFailMsg(error.response?.status === 404 ? 'City not found' : 'Something went wrong');
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
      <h3 className="text-white font-bold mb-4 text-xl">Search City</h3>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-all"
          placeholder="e.g. London, Tokyo..."
        />
        
        {failMsg && <p className="text-red-400 text-sm font-medium animate-pulse">{failMsg}</p>}
        
        <button
          onClick={() => requestForecast(city)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
        >
          Get Forecast
        </button>
      </div>
    </div>
  );
};