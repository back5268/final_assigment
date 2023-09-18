import './App.css';

import { LoginPage, ShowMovies, SignupPage, ShowDetail } from './components';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import data from './data/data.json';
import user from './data/user.json';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (data && data[0]) localStorage.setItem('dataJson', JSON.stringify(data));
    if (user && user[0]) localStorage.setItem('userJson', JSON.stringify(user));
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<ShowMovies />} />
        <Route path='/showdetail/:id' element={<ShowDetail />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;