/* jshint ignore: start */

import React, { useState, useEffect } from 'react';
import EmojiCard from './EmojiCard.jsx';

// import "../scss/style.scss";

const Items = props => {

    const [emojis, setEmojis] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        console.log('items mounted/updated');
        fetch('/emojis/')
            .then(data => data.json())
            .then(data => {
                console.log('emojis fetched.');
                console.log(data);
                if (!fetched) {
                    setFetched(true);
                    setEmojis(data)
                }
            })
            .catch(err => {
                console.log(err);
            });
    });


    const emojiCards = [];
    for (const emoji of emojis) {
        emojiCards.push(<EmojiCard emoticon={emoji.code} name={emoji.name} description={emoji.description}/>);
    }

    if (!fetched) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }



    return (
        <>
            <div>
                <button>Add an Emoji</button>
            </div>
            <div className="items">
                {emojiCards}
            </div>
        </>
    );
}

export default Items;