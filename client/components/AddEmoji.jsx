// jshint ignore: start

import React from 'react';


const AddEmoji = props => {

  return (
    <>
      <label for="emoji">Emoji code:</label>
      <input type="text" name="emoji"></input>
      <label for="name">Emoji name:</label>
      <input type="text" name="name"></input>
    </>
  )
}

export default AddEmoji;