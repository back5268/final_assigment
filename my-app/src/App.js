import logo from './logo.svg';
import './App.css';

import { LoginPage, ShowMovies, SignupPage, ShowDetail } from './components';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {
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