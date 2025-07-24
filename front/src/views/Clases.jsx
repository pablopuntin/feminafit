// src/views/Clases.jsx
import React from 'react';
import CardClase from '../components/CardClase';
import '../styles/Clases.css';

const clases = [
  {
    titulo: "Funcional",
    descripcion: "Ejercicios de alta intensidad para mejorar fuerza y resistencia.",
    imagen: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=400&h=300&auto=format&fit=crop",
  },
  {
    titulo: "Yoga",
    descripcion: "Conectá cuerpo y mente con técnicas de respiración y estiramientos.",
    imagen: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=400&h=300&auto=format&fit=crop",
  },
  {
    titulo: "Zumba",
    descripcion: "Bailá y divertite mientras entrenás con ritmos latinos.",
    imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&h=300&auto=format&fit=crop",
  },
];

const Clases = () => {
  return (
    <section className="clases-section">
      <div className="clases-container">
        <div className="clases-header">
          <h6 className="subtitulo">NUESTRAS CLASES</h6>
          <h2 className="titulo">Encuentra la clase perfecta para ti</h2>
          <p className="descripcion">
            Ofrecemos una amplia variedad de clases dirigidas por profesionales para todos los niveles y objetivos
          </p>
        </div>

        <div className="cards-grid">
          {clases.map((clase, index) => (
            <CardClase key={index} {...clase} />
          ))}
        </div>

        <div className="ver-todas">
          <a href="#contacto" className="btn-ver-todas">Ver todas las clases</a>
        </div>
      </div>
    </section>
  );
};

export default Clases;
