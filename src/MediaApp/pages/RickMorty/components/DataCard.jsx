import React from 'react';

export const DataCard = ({ label, value }) => {
  return (
    <div className="backdrop-blur-sm bg-white/20 rounded-lg p-4 border border-white/10">
      <p className="text-white/80 text-sm mb-1">{label}</p>
      <p className="font-bold text-lg truncate">{value || 'Unknown'}</p>
    </div>
  );
};
