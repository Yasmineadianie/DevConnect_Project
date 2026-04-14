import React from 'react';
import { CardApp } from './CardApp';

export const CardGallery = ({ forecast }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
      {forecast?.map((elem) => (
        <CardApp key={elem.dt} elem={elem} />
      ))}
      {forecast.length === 0 && (
        <div className="w-full h-40 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl">
          <p className="text-slate-500 italic">No data available. Search for a city!</p>
        </div>
      )}
    </div>
  );
};