import React from 'react';
import CardNosotros from '../components/CardNosotros';
import "../styles/Nosotros.css";

const Nosotros = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="left">
          <h6 className="subtitle">SOBRE NOSOTROS</h6>
          <h2 className="title">Más de 10 años transformando vidas</h2>
          <p className="lead">
            En PowerFit, nos dedicamos a ayudarte a alcanzar tus metas fitness con un enfoque personalizado y un ambiente motivador.
          </p>
          <p className="text">
            Nuestro gimnasio cuenta con zonas especializadas para entrenamiento de fuerza, cardio, clases grupales y recuperación. Creemos en un enfoque integral que combina ejercicio, nutrición y bienestar mental.
          </p>
          <a href="#contacto" className="button">
            Conócenos &rarr;
          </a>
        </div>
        <div className="right">
          <CardNosotros
            icon="🏆"
            title="Entrenadores certificados"
            description="Profesionales con experiencia y certificaciones para guiarte."
          />
          <CardNosotros
            icon="⏰"
            title="Abierto 24/7"
            description="Acceso libre a nuestras instalaciones en cualquier momento."
          />
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
