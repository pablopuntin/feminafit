import {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';
import Home from './views/Home.jsx';
import MisTurnos from './views/MisTurnos.jsx';
import Navbar from './components/Navbar.jsx';
import CrearTurno from "./views/CrearTurno.jsx";
import Nosotros from './views/Nosotros.jsx';
import Clases from './views/Clases.jsx';



const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-turno" element={<CrearTurno />} />
        <Route path="/mis-turnos" element={<MisTurnos userId={user?.id} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/clases" element={<Clases />} />
      </Routes>
    </>
  );
};

export default App;

