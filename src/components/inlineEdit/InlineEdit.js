import React, { useState } from 'react';
import './InlineEdit.css'

function InlineEdit({value, setValue, required, placeholder, children}) {
  
  const [isEditing, setEditing] = useState(true);
  const [text, setText] = useState(value);

  const handleTextClick = () => {
    setEditing(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event) => {    
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <div>
      {isEditing || !value ? (
        <input
          className="inline-edit"
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}          
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <div onClick={(handleTextClick)}>
          {children}
        </div>
      )}
    </div>
  );
}

export default InlineEdit;
