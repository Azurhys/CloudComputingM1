import React from 'react';
import getTweets from '../hooks/getTweet';
import TweetList from './TweetList'

const Accueil = () => {
    const tweets = getTweets();
    return ( 
    <div className="container align-content-center ">
        <h1>Les meilleurs tweets</h1>
        <p> Ce site sert à répertorier les tweets les plus marquant du réseau social X/Twitter. Nous ne sommes en aucun cas responsables des propos tenus dans ces tweets.</p>
        <h1>Masterclass</h1>

         <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Masterclass')} /> 

        <h1>Gros Flop</h1>
         <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Gros Flop')} />

        <h1>Chef ???</h1>
        <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Chef ???')} /> 

    </div> );
}
 
export default Accueil;