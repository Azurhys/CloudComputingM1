import React from 'react';

const Tweet = ({ text, category }) => (
  <div className="card">
    <div className="card-body">
      <p className="card-text">{text}</p>
      <p className="card-category">Catégorie: {category}</p>
    </div>
  </div>
);

export default Tweet;