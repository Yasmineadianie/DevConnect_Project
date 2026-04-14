import React from 'react';

export const Profile = ({ elem, setInfoCharater }) => {
  const handleSeeMore = () => {
    setInfoCharater(elem);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl p-4 hover:shadow-xl transition">
      {elem.image ? (
        <img
          src={elem.image}
          alt={elem.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div
          className={`w-full h-48 flex flex-col items-center justify-center p-4 text-center
          ${elem.dimension ? 'bg-green-100' : 'bg-purple-100'}`}
        >
          <span className="text-5xl">{elem.dimension ? '🪐' : '🎬'}</span>
          <p className="text-xs font-bold mt-2 text-gray-500 uppercase">
            {elem.dimension ? 'Location' : 'Episode'}
          </p>
        </div>
      )}

      <div className="p-3">
        <h5 className="font-bold truncate text-gray-800">{elem.name}</h5>
        <p className="text-sm text-gray-500">
          {elem.species || elem.type || elem.episode}
        </p>
      </div>
      <button
        onClick={handleSeeMore}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
      >
        See More
      </button>
    </div>
  );
};
