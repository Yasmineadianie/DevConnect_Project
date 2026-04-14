import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-center"
        >
          <span className="text-white">WELCOME TO </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            DEVCONNECT
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-center mb-12 text-lg"
        >
          A Full Stack platform exploring the Multiverse, Pokédex, and real-time
          data.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              path: '/rick&morty',
              title: 'Rick & Morty',
              desc: 'Explore the multiverse',
              color: 'hover:border-green-400',
              text: 'text-green-400',
            },
            {
              path: '/weather',
              title: 'Weather App',
              desc: 'Real-time forecast',
              color: 'hover:border-blue-400',
              text: 'text-blue-400',
            },
            {
              path: '/pokemonApp',
              title: 'Pokédex',
              desc: 'Catch them all',
              color: 'hover:border-red-500',
              text: 'text-red-500',
            },
            {
              path: '/profiles',
              title: 'Community',
              desc: 'Connect with devs',
              color: 'hover:border-purple-500',
              text: 'text-purple-400',
            },
          ].map((card) => (
            <motion.div
              key={card.path}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(card.path)}
              className={`group cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl ${card.color} transition-colors shadow-xl`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${card.text}`}>
                {card.title}
              </h3>
              <p className="text-slate-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
