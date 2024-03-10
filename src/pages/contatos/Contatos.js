import "./contatos.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Contatos() {

  const contatosTitle = "OLA !!!!"

  return (
    <div>
      {contatosTitle}
      <div>
        <a href="/">voltar</a> 
      </div>
    </div>
  );
}

export default Contatos;
