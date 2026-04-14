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
  console.log('usuario logueado', user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      const fetchData = async () => {
        try {
          let resUser = await axios.get('http://localhost:4000/api/getUser', {
            headers: { authorization: `Bearer ${tokenStorage}` },
          });
          setUser(resUser.data.user);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/profiles');
        console.log('Respuesta del backend:', res.data);
        setUsers(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const logOut = () => {
    setUser();
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <header>
        <NavbarM user={user} logOut={logOut} />
      </header>

      <main >
        <Suspense
          fallback={
            <div>
              <p>Cargando...</p>
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
