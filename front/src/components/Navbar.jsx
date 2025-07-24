import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser, setUserAppointments } = useContext(UserContext);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setUserAppointments([]);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="logo" to="/">Femina Fit</Link>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/clases">Clases</Link></li>
          <li><Link to="/register">Registro</Link></li>

          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-btn">Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>

          {isLoggedIn && (
            <>
              <li><Link to="/mis-turnos">Mis Turnos</Link></li>
              <li><Link to="/crear-turno">Crear Turnos</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

