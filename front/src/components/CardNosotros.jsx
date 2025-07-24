import React from 'react';
import '../styles/CardNosotros.css';

const CardNosotros = ({ icon, title, description, imageSrc }) => {
  return (
    <div className="card">
      {imageSrc && <img src={imageSrc} alt={title} className="card-image" />}
      <div className="icon-title">
        <div className="icon-circle">{icon}</div>
        <h5 className="title">{title}</h5>
      </div>
      {description && <p className="description">{description}</p>}
    </div>
  );
};

export default CardNosotros;
