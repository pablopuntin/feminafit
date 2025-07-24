// src/components/CardClase.jsx
import React from 'react';
import '../styles/CardClase.css';

const CardClase = ({ titulo, descripcion, imagen }) => {
  return (
    <div className="card-clase">
      <div className="card-imagen" style={{ backgroundImage: `url(${imagen})` }}></div>
      <div className="card-body">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default CardClase;
