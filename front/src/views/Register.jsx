import { useState } from "react";
import axios from "axios";


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    birthdate: "",
    nDni: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, username, password, birthdate, nDni } = form;
    if (!name || !email || !username || !password || !birthdate || !nDni) {
      return setMessage("Por favor completa todos los campos.");
    }

    try {
      const response = await axios.post("http://localhost:3000/users/register", form);
      setMessage(response.data.message || "Usuario registrado correctamente");
      setForm({
        name: "",
        email: "",
        username: "",
        password: "",
        birthdate: "",
        nDni: ""
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el registro.");
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <input type="number" name="nDni" placeholder="DNI" value={form.nDni} onChange={handleChange} />
        <input type="date" name="birthdate" placeholder="Fecha de nacimiento" value={form.birthdate} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;
