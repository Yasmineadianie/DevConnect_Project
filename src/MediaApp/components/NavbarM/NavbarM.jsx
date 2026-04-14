import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, X, LogOut, Info } from 'lucide-react';

export const NavbarM = ({ user, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    logOut();
    setIsOpen(false);
    navigate('/login');
  };

  // Función para saber si un link está activo y darle un estilo especial
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profiles', path: '/profiles' },
    { name: 'Multiverse', path: '/rick&morty' },
    { name: 'Pokédex', path: '/pokemonApp' },
    { name: 'Weather', path: '/weather' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <h2 className="text-2xl font-black tracking-tighter transition-transform group-hover:scale-105">
              <span className="text-white">DEV</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                CONNECT
              </span>
            </h2>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive(link.path)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/about"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-bold transition-all rounded-lg ${
                  isActive('/about')
                    ? 'text-purple-400 bg-purple-500/10'
                    : 'text-purple-400/80 hover:text-purple-400 hover:bg-purple-500/5'
                }`}
              >
                <Info size={16} />
                About
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 p-1 pr-4 rounded-full border border-white/10">
                <img
                  src={`http://localhost:4000/images/users/${user.img}`}
                  className="h-8 w-8 rounded-full object-cover border border-purple-500 shadow-lg shadow-purple-500/20"
                  alt="profile"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100';
                  }}
                />
                <span className="text-white text-sm font-semibold">
                  {user.name}
                </span>
                <button
                  onClick={handleLogOut}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

   
      {isOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-white/10 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                isActive(link.path) ? 'bg-white/10 text-white' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-purple-400 font-bold text-lg border-t border-white/5 mt-2"
          >
            About Project
          </Link>
          <hr className="border-white/10 my-4" />
          {user ? (
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={`http://localhost:4000/images/users/${user.img}`}
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                />
                <span className="text-white font-bold">{user.name}</span>
              </div>
              <button
                onClick={handleLogOut}
                className="text-red-400 font-bold flex items-center gap-2"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 text-gray-400 font-bold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 bg-purple-600 text-white rounded-xl font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
