import React from 'react';
import './Input.css'
const InputField = (props) => {

    return (
      <input
        className="calcDisplay"
        type="text"
        value={props.value}
        onChange={props.onChange} />
      )

}

export default InputField;
