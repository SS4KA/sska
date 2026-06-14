import React from "react";

const ArtCard = ({ painting }) => {
  return (
    <li className="art-card">
      <img 
        src={painting.imageUrl} 
        alt={painting.title}
        loading="lazy"
      />
      <div className="art-card-info">
        <div className="art-detail detail-hover">
          <h1 className="art-title">{painting.artist}</h1>
          <p className="art-subtitle">{painting.location}</p>
        </div>
        <div className="art-detail detail-default">
          <h1 className="art-title">{painting.title}</h1>
          <p className="art-subtitle art-year">{painting.year}</p>
        </div>
      </div>
    </li>
  );
};

export default ArtCard;