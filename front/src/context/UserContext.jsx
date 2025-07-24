import React, { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto
export const UserContext = createContext();

// 2. Crear el provider que va a envolver toda la app
export const UserProvider = ({ children }) => {
  // Estado global que contiene user y sus turnos
  const [user, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);

  // Al cargar la app, intentamos recuperar datos guardados en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAppointments = localStorage.getItem('appointments');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAppointments) setUserAppointments(JSON.parse(storedAppointments));
  }, []);

  // Guardar cambios en localStorage cada vez que cambian user o turnos
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (userAppointments.length > 0) localStorage.setItem('appointments', JSON.stringify(userAppointments));
    else localStorage.removeItem('appointments');
  }, [userAppointments]);

  // Función para limpiar todo al hacer logout
  const logout = () => {
    setUser(null);
    setUserAppointments([]);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      userAppointments,
      setUserAppointments,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};
