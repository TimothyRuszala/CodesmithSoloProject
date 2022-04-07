/* jshint ignore: start */

import React, { useState } from 'react';

const EmojiCardCheckout = props => {

    const [emoticon, setEmoticon] = useState(props.emoticon);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);

    return (
        <div className="card card-checkout">
            <span>{emoticon}</span>
            <div className="data">
                <p className="name">{name}</p>
                <p>${parseFloat(price).toFixed(2)}</p>
                <button onClick={() => props.remove(name)}>Remove</button>
            </div>
        </div>
    )
}

export default EmojiCardCheckout;