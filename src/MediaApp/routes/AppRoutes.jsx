import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { NavbarM } from '../components/NavbarM/NavbarM';
import Footer from '../components/Footer/Footer';
import axios from 'axios';

const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const Register = lazy(() => import('../pages/Register/Register'));
const Login = lazy(() => import('../pages/Login/Login'));
const Profiles = lazy(() => import('../pages/Profiles/Profiles'));
const WeatherApp = lazy(() => import('../pages/WeatherApp/WeatherApp'));
const PokemonApp = lazy(() => import('../pages/PokemonApp/PokemonApp'));
const RickMorty = lazy(() => import('../pages/RickMorty/RickMorty'));
const NotFound = lazy(() => import('../pages/NoFound'));

export const AppRoutes = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  
  // URL de la variable de entorno
  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Efecto para recuperar sesión del usuario logueado
  useEffect(() => {
    let tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      const fetchData = async () => {
        try {
          // Cambiamos localhost por la variable
          let resUser = await axios.get(`${API_URL}/api/getUser`, {
            headers: { authorization: `Bearer ${tokenStorage}` },
          });
          setUser(resUser.data.user);
        } catch (error) {
          console.log("Error recuperando usuario:", error);
        }
      };
      fetchData();
    }
  }, [API_URL]); // Añadimos API_URL como dependencia

  // 2. Efecto para cargar todos los perfiles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cambiamos localhost por la variable
        const res = await axios.get(`${API_URL}/api/profiles`);
        console.log('Respuesta limpia del backend:', res.data);
        
       // res.data ya es el array de usuarios
        setUsers(res.data); 
      } catch (error) {
        console.log("Error cargando perfiles:", error);
      }
    };
    fetchData();
  }, [API_URL]);

  const logOut = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <header>
        <NavbarM user={user} logOut={logOut} />
      </header>

      <main>
        <Suspense
          fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
              <p className="text-white animate-pulse">Cargando...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/profiles"
              element={<Profiles user={user} users={users} />}
            />
            <Route path="/weather" element={<WeatherApp />} />
            <Route path="/rick&morty" element={<RickMorty />} />
            <Route path="/pokemonApp" element={<PokemonApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
};