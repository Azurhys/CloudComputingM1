import React from 'react';
import { Tweet } from 'react-tweet'

const TweetItem = ({ text, author, link }) => (
  <div className="card my-3 d-flex align-items-center flex-column w-50 bg-light">
    <div className="card-body">
      <p className="card-text">{text}</p> 
      <p className="card-category fw-bold" >Auteur : { author }</p>
        <Tweet id={link} />
    </div>
  </div>
);

export default TweetItem;