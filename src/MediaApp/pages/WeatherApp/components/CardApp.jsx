import React from 'react';

export const CardApp = ({ elem }) => {
  const weatherEmojis = {
    "01d": "☀️", "01n": "🌙",
    "02d": "⛅", "02n": "☁️",
    "03d": "☁️", "03n": "☁️",
    "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️",
    "10d": "🌦️", "10n": "🌧️",
    "11d": "⛈️", "11n": "⛈️",
    "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️",
  };

  // Format date to show "Mon", "Tue", etc.
  const date = new Date(elem.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="min-w-[160px] bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-5 hover:border-blue-400 transition-all shadow-xl text-center group">
      <p className="text-blue-400 font-bold text-sm uppercase mb-3">{date}</p>
      
      <span className="text-5xl block mb-3 group-hover:scale-110 transition-transform">
        {weatherEmojis[elem.weather[0].icon] ?? "🌡️"}
      </span>
      
      <div className="text-2xl font-black text-white mb-2">
        {Math.round(elem.main.temp)}°C
      </div>
      
      <div className="text-slate-400 text-xs font-medium">
        Humidity: <span className="text-slate-200">{elem.main.humidity}%</span>
      </div>
    </div>
  );
};