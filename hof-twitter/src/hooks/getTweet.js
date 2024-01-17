import React, { useEffect, useState } from 'react';
import axios from 'axios';

function getTweets() {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/tweets') 
        .then(response => {setTweets(response.data)
        console.log(response.data)})
        .catch(error => console.error('Erreur lors de la récupération des tweets :', error));
    }, []);

    return ( tweets );
}
 
export default getTweets;