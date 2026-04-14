import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const initialValue = {
  email: '',
  password: ''
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [login, setlogin] = useState(initialValue);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
     let tokenResponse = await axios.post(
       'https://devconnect-project-w5cq.onrender.com/api/login',
       login,
     );
     localStorage.setItem('token', tokenResponse.data.token);
     let token = tokenResponse.data.token;

     let resUser = await axios.get(
       'https://devconnect-project-w5cq.onrender.com/api/getUser',
       {
         headers: { authorization: `Bearer ${token}` },
       },
     );
      setUser(resUser.data.user);
      navigate('/');
    } catch (error) {
      console.log(error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
     
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <span className="text-white">DEV</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">CONNECT</span>
          </h1>
          <p className="text-slate-400 font-medium">Log In to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="name@example.com" 
              value={login.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-600"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={login.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all placeholder:text-slate-600"
              required
            />
          </div>

          {message && (
            <p className="text-red-400 text-sm text-center font-medium animate-pulse">
              {message}
            </p>
          )}

          <div className="pt-2 flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20"
            >
              Sign In
            </button>
            
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-slate-700/50 text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-slate-400 text-sm">
            Don't have an account? {' '}
            <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;