import React from 'react';
import style from './Button.css';

// interface Props {
//   type?: "button" | "submit" | "reset" | undefined;
//   onClick?: () => void;
//   children: React.ReactNode;
// }

export default function Button( {type, onClick, children}) {
  return (
    <button onClick={onClick} type={type} className={style.button} >
        {children}
    </button> 
  );
}