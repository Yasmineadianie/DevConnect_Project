import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-black text-white/10 absolute inset-0 flex items-center justify-center z-0 select-none">
          404
        </h1>
        
        <div className="relative z-10">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-8xl mb-6"
          >
            🛸
          </motion.div>
          
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
            LOST IN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MULTIVERSE?</span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            The coordinates you entered don't exist in this dimension. Rick might have messed up the portal gun again.
          </p>

          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-purple-500/20"
          >
            Back to Reality
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;