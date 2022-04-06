/* jshint ignore: start */

import React, { useState } from 'react';

const EmojiCard = props => {

    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [emoticon, setEmoticon] = useState(props.emoticon);

    


    const update = function() {
        const newName = document.getElementById('new-name').value;
        const newDescription = document.getElementById('new-description').value;

        fetch('/emojis/', {
            method: 'PATCH',
            body: JSON.stringify({
                oldName: name,
                newName,
                newDescription
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
            })
    }

    const edit = function() {
        setUpdating(true);
    }

    if (updating) {
        return (
            <div className="card">
                <span>{`&#${emoticon};`}</span>
                <p>Name:</p>
                <input type="text" id="new-name"></input>
                <p>Description: </p>
                <input type="text" id="new-description"></input>
                <button onClick={update} id="confirm">Confirm</button>
            </div>
        )
    }

    return (
        <div className="card">
            <span>{`&#${props.emoticon};`}</span>
            <p>{name}</p>
            <p>Description: {description}</p>
            <button onClick={edit}>Edit</button>
        </div>
    )
}

export default EmojiCard;