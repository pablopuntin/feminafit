
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Turno from '../components/Turno';
import { UserContext } from '../context/UserContext';

const MisTurnos = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3000/appointments/user/${user.id}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            setAppointments(res.data);
          } else if (Array.isArray(res.data.appointments)) {
            setAppointments(res.data.appointments);
          } else {
            setAppointments([]);
          }
        })
        .catch(err => console.error("Error al obtener turnos:", err));
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/appointments/${id}/cancel`);
      const updatedAppointment = res.data;
      setAppointments(prev => prev.map(turno =>
        turno.id === id ? updatedAppointment : turno
      ));
    } catch (error) {
      console.error("Error al cancelar turno:", error);
    }
  };

  return (
    <div className="table-container">
      <h2 style={{ textAlign: 'center' }}>Mis Turnos</h2>

      {appointments.length === 0 ? (
        <p>No hay turnos registrados.</p>
      ) : (
        <table className="table-excel">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(turno => (
              <tr key={turno.id}>
                <td>{turno.user?.name || "Sin nombre"}</td>
                <td>{turno.date}</td>
                <td>{turno.time}</td>
                <td>{turno.description}</td>
                <td className={turno.status === 'active' ? 'text-success' : 'text-danger'}>
                  {turno.status}
                </td>
                <td>
                  {turno.status === 'active' && (
                    <button
                      className="btn-cancelar"
                      onClick={() => handleCancel(turno.id)}
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisTurnos;
