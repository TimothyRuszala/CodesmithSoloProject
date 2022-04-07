/* jshint ignore: start */

import React, { useState } from 'react';

const EmojiCard = props => {

    
    const [name, setName] = useState(props.name);
    const [emoticon, setEmoticon] = useState(props.emoticon);
    const [price, setPrice] = useState(props.price);
    const [priceID, setPriceID] = useState(props.price_ID);
    const [updating, setUpdating] = useState(false);



    const update = function() {
        const newName = document.getElementById('new-name').value.toUpperCase();
        const newPrice = document.getElementById('new-price').value;
        const newEmoticon = document.getElementById('new-emoticon').value;
        const newPriceID = document.getElementById('new-price_id').value;


        fetch('/emojis/', {
            method: 'PATCH',
            body: JSON.stringify({
                oldName: name,
                newName,
                newPrice,
                newEmoticon,
                newPriceID,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log("data sent back to EmojiCard:", data);
                setUpdating(false);
                setName(data.name);
                setPrice(data.price);
                setEmoticon(data.emoticon);
                setPriceID(data.priceID);
            })
    }

    const edit = function() {
        setUpdating(true);
    }

    const addToCart = function () {
        console.log('addToCart called');
        fetch('/cart/', {
            method: 'POST',
            body: JSON.stringify({
                emoticon,
                name,
                price,
                priceID
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                console.log(`New cart: ${data}`);
                document.getElementById(`add-${name}-to-cart`).innerText = 'Added!';
            })
        .catch(err => console.log('EmojiCard addToCart err:', err));
    }


    if (updating) {
        console.log('updating... priceID is', priceID);
        return (
            <div className="card">
                <span>{emoticon}</span>
                <label for="new-name">Name:</label>
                <input type="text" id="new-name" name="new-name" defaultValue={name}></input>
                <br></br>
                <label for="new-price">Price: </label>
                <input type="text" id="new-price" name="new-price" defaultValue={price}></input>
                <br></br>
                <label for="new-emoticon">Emoticon:</label>
                <input type="text" id="new-emoticon" name="new-emoticon" defaultValue={emoticon}></input>
                <br></br>
                <label for="new-price_id">price_id:</label>
                <input type="text" id="new-price_id" name="new-price_id" defaultValue={priceID}></input>
                <br></br>
                <button onClick={update} id="confirm">Confirm</button>
            </div>
        )
    }

    return (
        <div className="card">
            <span>{emoticon}</span>
            <p className="name">{name}</p>
            <div className="data">
                <p>${parseFloat(price).toFixed(2)} </p>
                {/* <p>Description: {description}</p> */}
                <div className="card-buttons">
                    <button onClick={edit}>Edit</button>
                    <button onClick={() => props.del(name)}>Delete</button>
                    <button onClick={addToCart} id={`add-${name}-to-cart`}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default EmojiCard;