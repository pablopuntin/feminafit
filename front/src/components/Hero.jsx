// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="features">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature">
            <span role="img" aria-label="rápido">⚡</span>
            <h3>Rápido</h3>
            <p>Reservá tu clase en segundos desde cualquier dispositivo.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="seguro">🔒</span>
            <h3>Seguro</h3>
            <p>Tu información y turnos están protegidos con tecnología moderna.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="fácil">👌</span>
            <h3>Fácil</h3>
            <p>Una interfaz simple pensada para todas las edades.</p>
          </div>
        </div>
      </section>
  )}

export default Hero;
