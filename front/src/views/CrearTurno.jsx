// src/views/CrearTurno.jsx
import { useState } from 'react';
import axios from 'axios';

const CrearTurno = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    date: '',
    time: '',
    description: '',
    userId: user?.id,
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMensaje('Debes iniciar sesión para crear un turno');
      return;
    }

    try {
      const body = { ...form, userId: user.id };

      console.log("BODY A ENVIAR:", body);
      const response = await axios.post('http://localhost:3000/appointments/schedule', body);
      setMensaje(response.data.message || 'Turno creado correctamente');
      console.log(form);

      // Limpiar formulario
      setForm({ date: '', time: '', description: '' });

      // Podrías también actualizar los appointments en localStorage o context acá
    } catch (error) {
      console.error(error);
      setMensaje('Error al crear el turno');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Turno</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora:</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Motivo del turno"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Agendar turno</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default CrearTurno;
