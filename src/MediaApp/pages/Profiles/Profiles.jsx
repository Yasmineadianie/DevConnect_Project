import React from 'react';

const Profiles = ({ users = [] }) => {
  // Obtenemos la URL base dinámicamente
  const API_URL = import.meta.env.VITE_API_URL;

  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-500 animate-pulse">
          Loading Web Community...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h2 className="text-3xl font-black mb-8 text-white text-center tracking-tighter">
        WEB{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          COMMUNITY
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user.user_id}
            className="group bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500 transition-all overflow-hidden shadow-lg"
          >
            <div className="aspect-square w-full overflow-hidden bg-slate-950">
              <img
                src={`${API_URL}/images/users/${user.img}`}
                alt={user.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=User';
                }}
              />
            </div>

            <div className="p-3 text-center">
              <h3 className="font-bold text-white text-sm md:text-base truncate">
                {user.name}
              </h3>
              <p className="text-[10px] text-purple-400 font-medium mb-1 truncate italic">
                {user.email}
              </p>
              {user.bio && (
                <p className="hidden sm:block text-slate-500 text-[10px] line-clamp-1 border-t border-slate-700/50 pt-2 mt-2">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
