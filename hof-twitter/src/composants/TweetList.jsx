import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets }) => (
  <div className="tweet-list">
    {tweets.map((tweet, index) => (
      <Tweet key={index} text={tweet.text} category={tweet.category} />
    ))}
  </div>
);

export default TweetList;