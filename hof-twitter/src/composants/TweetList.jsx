import React from 'react';
import TweetItem from './Tweet';

const TweetList = ({ tweets }) => (
  <div className="tweet-list d-flex flex-column align-items-center">
    {tweets.map((tweet, index) => (
      <TweetItem key={index} text={tweet.text} author={tweet.author} link={tweet.link} />
    ))}
  </div>
);

export default TweetList;