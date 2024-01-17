const Accueil = () => {
 
    return ( 
    <div className="container">
        <h1>Les meilleurs tweets</h1>
        <p> Ce site sert à répertorier les tweets les plus marquant du réseau social X/Twitter. Nous ne sommes en aucun cas responsables des propos tenus dans ces tweets.</p>
        <h2>Masterclass</h2>
        {/* <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Masterclass')} /> */}

        <h2>Gros Flop</h2>
        {/* <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Gros Flop')} /> */}

        <h2>Chef ???</h2>
        {/* <TweetList tweets={tweets.filter((tweet) => tweet.category === 'Chef ???')} /> */}

    </div> );
}
 
export default Accueil;