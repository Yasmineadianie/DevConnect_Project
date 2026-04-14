import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black/60 backdrop-blur-lg border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          
          
          <div>
            <h2 className="text-2xl font-black mb-2">
              <span className="text-white">DEV</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">CONNECT</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
          A Full Stack practice platform. Connecting different worlds through modern APIs and relational databases.
          
            </p>
          </div>

        
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'MySQL', 'Tailwind CSS'].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white hover:bg-white/20 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

       
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            Developed with passion for clean code
          </p>

     
          <div className="flex gap-4">
          
            <a 
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>

          
            <a 
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>

         
            <a 
              href="mailto:your.email@example.com"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;