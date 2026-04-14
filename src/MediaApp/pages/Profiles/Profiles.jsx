import React from 'react';

const Profiles = ({ users = [] }) => {
  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-500 animate-pulse">Loading Web Community...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h2 className="text-4xl font-black mb-12 text-white text-center tracking-tighter">
        WEB <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">COMMUNITY</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {users.map((user) => (
          <div key={user.user_id} className="group bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all overflow-hidden shadow-xl">
            
            <div className="aspect-square w-full overflow-hidden bg-slate-950">
              <img
                src={`http://localhost:4000/images/users/${user.img}`}
                alt={user.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=No+User'; }}
              />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-white text-xl truncate mb-1">
                {user.name} {user.lastname}
              </h3>
              <p className="text-sm text-purple-400 font-medium mb-3 truncate italic">
                {user.email}
              </p>
              
              {user.bio && (
                <p className="text-slate-400 text-xs line-clamp-2 border-t border-slate-700 pt-3">
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