/* jshint ignore: start */

import React, { useState, useEffect } from 'react';
import EmojiCard from './EmojiCard.jsx';



const Items = props => {

    const [emojis, setEmojis] = useState([]);
    const [fetched, setFetched] = useState(false);

    // fetch emojis
    useEffect(() => {
        console.log('items mounted/updated');
        fetch('/emojis/')
            .then(data => data.json())
            .then(data => {
                console.log('emojis fetched:', data);
                if (!fetched) {
                    setFetched(true);
                    setEmojis(data)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [emojis, fetched]); // dependency array causes this to fire when state changes here

    // initialize cart
    useEffect(() => {
        fetch('/cart/')
            .then(data => data.json())
            .then(data => {
                console.log('cart initialized:', data);
        })
    })

    const addEmoji = function (){
        console.log('Items.jsx addEmoji called');
        fetch('/emojis/', {
            method: 'POST',
            body: JSON.stringify({
                name: Math.floor(Math.random() * 100000),
                emoticon: '?'
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log('data received from addEmoji in Items.jsx:', data);
                setFetched(false); // refactor this so that it's setEmojis, not setFetched
            })
            .catch(err => {
                console.log('addEmoji error: ', err);
        })
    }

    const deleteEmoji = function (name) {
        console.log('Items.jsx deleteEmoji called');
        fetch(`/emojis/${name}`, {
            method: 'DELETE',
        })
            .then(data => data.json())
            .then(data => {
                console.log('data returned after delete:', data);
                setFetched(false);
        })
    }

    const addToCart = function () {
        console.log('Items.jsx addToCart called');
        
    }


    // create the array of cards to render
    const emojiCards = [];
    for (const emoji of emojis) {
        emojiCards.push(<EmojiCard emoticon={emoji.emoticon} name={emoji.name} description={emoji.description} del={deleteEmoji} price={emoji.price} key={emoji.name}/>);
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
                <button className="add-emoji" onClick={addEmoji}>Add an Emoji</button>
            </div>
            <div className="items">
                {emojiCards}
            </div>
        </>
    );
}

export default Items;