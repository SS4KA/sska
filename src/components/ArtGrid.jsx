import React from "react";
import ArtCard from "./ArtCard";

const ArtGrid = ({ paintings }) => {
  if (!paintings || paintings.length === 0) {
    return <div className="text-center" style={{ padding: "40px 0" }}>No paintings found.</div>;
  }

  return (
    <ul className="art-grid">
      {paintings.map((painting, index) => (
        <ArtCard key={index} painting={painting} />
      ))}
    </ul>
  );
};

export default ArtGrid;