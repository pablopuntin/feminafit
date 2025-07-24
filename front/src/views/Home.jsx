import React from 'react';
import Hero from '../components/Hero';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
     <div className="hero-container">
      <div className="overlay">
        <h1 className="hero-title">Bienvenido a Femina Fit</h1>
        <p className="hero-subtitle">
          Donde la energía femenina encuentra su mejor versión.
        </p>
        <a href="/clases" className="hero-button">Ver nuestras clases</a>
      </div>
    </div>

      <Hero />
     
    </>
  );
};

export default Home;

