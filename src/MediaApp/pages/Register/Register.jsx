import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const initialValue = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  bio: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(initialValue);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('registerData', JSON.stringify(registerData));
    if (file) formData.append('img', file);

    try {
      await axios.post(
        'https://devconnect-project-w5cq.onrender.com/api/register',
        formData,
      );
      navigate('/login');
    } catch (error) {
      console.log(error);
      setMessage('Error creating account. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 pt-20">
      <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-tighter mb-1">
            <span className="text-white">JOIN </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              DEVCONNECT
            </span>
          </h1>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
            New Developer Profile
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              First Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John"
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Doe"
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleFile}
              className="w-full text-[10px] text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-slate-700 file:text-purple-400 hover:file:bg-slate-600 transition-all cursor-pointer"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-slate-400 text-[10px] font-bold mb-1 ml-1 uppercase">
              Bio
            </label>
            <textarea
              name="bio"
              rows="2"
              placeholder="Tech stack..."
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-xs focus:border-purple-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {message && (
            <p className="col-span-2 text-red-400 text-center text-[10px] font-bold italic">
              {message}
            </p>
          )}

          <div className="col-span-2 flex flex-col gap-2 mt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black py-2.5 rounded-lg hover:opacity-90 transition-all shadow-lg"
            >
              CREATE ACCOUNT
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-slate-500 text-[10px] font-bold hover:text-slate-300 transition-all uppercase tracking-widest"
            >
              Already a member? Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
