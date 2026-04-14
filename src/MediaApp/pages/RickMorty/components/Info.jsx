import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { X, MapPin, Tv, User } from 'lucide-react';
import { DataCard } from './DataCard';

export const Info = ({ infoCharater, setInfoCharater }) => {
  const [show, setShow] = useState(false);

  // Abrir modal cuando infoCharater cambia
  useEffect(() => {
    if (infoCharater) {
      setShow(true);
    }
  }, [infoCharater]);

  const handleClose = () => {
    setShow(false);
    setInfoCharater(null);
  };

  if (!infoCharater) return null;

  // tipo de dato  mostrado
  const isCharacter = !!infoCharater.image;
  const isLocation = !!infoCharater.dimension;
  const isEpisode = !!infoCharater.air_date;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden border border-white/20">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition z-10 bg-black/20 p-2 rounded-full"
          >
            <X size={20} />
          </button>

          {isCharacter ? (
            <img
              src={infoCharater.image}
              alt={infoCharater.name}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-white/10 text-white">
              {isLocation ? (
                <MapPin size={80} className="mb-2" />
              ) : (
                <Tv size={80} className="mb-2" />
              )}
              <span className="text-xl font-bold uppercase tracking-widest opacity-50">
                {isLocation ? 'Location' : 'Episode'}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 text-white">
          <h2 className="text-4xl font-bold mb-4">{infoCharater.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isCharacter && (
              <>
                <DataCard label="Status" value={infoCharater.status} />
                <DataCard label="Species" value={infoCharater.species} />
                <DataCard label="Gender" value={infoCharater.gender} />
                <DataCard label="Origin" value={infoCharater.origin?.name} />
              </>
            )}

            {isLocation && (
              <>
                <DataCard label="Type" value={infoCharater.type} />
                <DataCard label="Dimension" value={infoCharater.dimension} />
                <DataCard
                  label="Residents"
                  value={infoCharater.residents?.length + ' personas'}
                />
                <DataCard
                  label="Created"
                  value={new Date(infoCharater.created).toLocaleDateString()}
                />
              </>
            )}

            {isEpisode && (
              <>
                <DataCard label="Air Date" value={infoCharater.air_date} />
                <DataCard label="Episode Code" value={infoCharater.episode} />
                <DataCard
                  label="Characters"
                  value={infoCharater.characters?.length + ' artistas'}
                />
                <DataCard
                  label="Created"
                  value={new Date(infoCharater.created).toLocaleDateString()}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
