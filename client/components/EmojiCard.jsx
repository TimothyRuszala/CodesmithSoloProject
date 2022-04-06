/* jshint ignore: start */

import React, { useState } from 'react';

const EmojiCard = props => {

    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [emoticon, setEmoticon] = useState(props.emoticon);
    const [price, setPrice] = useState(props.price);


    const update = function() {
        const newName = document.getElementById('new-name').value.toUpperCase();
        // const newDescription = document.getElementById('new-description').value;
        const newPrice = document.getElementById('new-price').value;
        const newEmoticon = document.getElementById('new-emoticon').value;

        fetch('/emojis/', {
            method: 'PATCH',
            body: JSON.stringify({
                oldName: name,
                newName,
                newPrice,
                newEmoticon
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
                // setDescription(data.description);
                setPrice(data.price);
                setEmoticon(data.emoticon);
            })
    }

    const edit = function() {
        setUpdating(true);
    }

    if (updating) {
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
                <button onClick={update} id="confirm">Confirm</button>
            </div>
        )
    }

    console.log('state:', name, description, emoticon);
    return (
        <div className="card">
            <span>{emoticon}</span>
            <p className="name">{name}</p>
            <div className="data">
                <p>Price: {price} ETH</p>
                {/* <p>Description: {description}</p> */}
                <button onClick={edit}>Edit</button>
                <button onClick={() => props.del(name)}>Delete</button>
                <button >Add to cart</button>
            </div>
        </div>
    )
}

export default EmojiCard;