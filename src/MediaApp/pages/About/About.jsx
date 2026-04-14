import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'React', level: 'Frontend Core', icon: '⚛️' },
    { name: 'Tailwind CSS', level: 'Modern Styling', icon: '🎨' },
    { name: 'Node.js', level: 'Backend Logic', icon: '🟢' },
    { name: 'MySQL', level: 'Relational DB', icon: '🐬' },
    { name: 'Framer Motion', level: 'Animations', icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
            ABOUT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              PROJECT
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            DevConnect is a Full Stack laboratory designed to master API
            integrations, secure authentication, and high-performance UI/UX
            patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-purple-500/30 pb-2">
              The Mission
            </h3>
            <p className="text-slate-400 leading-relaxed">
              This project integrates three different universes: a{' '}
              <span className="text-yellow-400">Pokédex</span>, a{' '}
              <span className="text-green-400">Multiverse explorer</span> (Rick
              & Morty), and a
              <span className="text-blue-400"> Real-time Weather app</span>.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Behind the scenes, it manages a{' '}
              <span className="text-purple-400">MySQL database</span> to handle
              user profiles and persistent data, proving that design and
              architecture go hand in hand.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-purple-500/30 pb-2">
              Technical Core
            </h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors"
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {skill.name}
                    </h4>
                    <p className="text-slate-500 text-xs">{skill.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm italic">
            "Clean code always looks like it was written by someone who cares."
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
