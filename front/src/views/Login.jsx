
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser, setUserAppointments } = useContext(UserContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return setMessage("Completa todos los campos.");
    }
    try {
      const response = await axios.post("http://localhost:3000/users/login", form);
      const { token, user, appointments } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      
      setUserAppointments(appointments || []);
      setMessage("Login exitoso.");
      // Aquí podés redirigir a otra ruta si querés, ejemplo:
      // navigate("/mis-turnos");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el login.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Usuario"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Contraseña"
        />
        <button className="btn btn-success">Ingresar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
