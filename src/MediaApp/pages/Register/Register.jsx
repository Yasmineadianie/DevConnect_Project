import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const initialValue = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  bio: ''
};

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialValue);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Usamos FormData porque hay una imagen involucrada
    const formData = new FormData();
    formData.append('registerData', JSON.stringify(registerData));
    if (file) formData.append('file', file);

    try {
      await axios.post('http://localhost:4000/api/createUser', formData);
      navigate('/login');
    } catch (error) {
      console.log(error);
      setMessage('Error creating account. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 pt-28">
      <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            <span className="text-white">JOIN </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">DEVCONNECT</span>
          </h1>
          <p className="text-slate-400 font-medium">Create your developer profile</p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* First Name */}
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">First Name</label>
            <input 
              type="text" name="name" placeholder="John"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Last Name</label>
            <input 
              type="text" name="lastname" placeholder="Doe"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Email Address</label>
            <input 
              type="email" name="email" placeholder="john@example.com"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Password</label>
            <input 
              type="password" name="password" placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          {/* Profile Picture */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Profile Picture</label>
            <input 
              type="file" 
              onChange={handleFile}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-all"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">Short Bio</label>
            <textarea 
              name="bio" rows="2" placeholder="Tell us about your tech stack..."
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {message && <p className="md:col-span-2 text-red-400 text-center text-sm">{message}</p>}

          <div className="md:col-span-2 flex flex-col gap-3 mt-4">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg shadow-purple-500/20"
            >
              Create Account
            </button>
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="w-full bg-slate-700/50 text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-700 transition-all"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;