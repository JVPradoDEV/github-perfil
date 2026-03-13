import { useState } from "react";

import Perfil from "./components/Perfil";
import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  // const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('')
  return (
    <>
    <div className="container">
      <h2>Insira o nome de usuário na caixa abaixo:</h2>
      <input className="input" type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />
    </div>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}


      {/* {formularioEstaVisivel && (
        <Formulario />
      )}
      <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type="button">Toggle Form</button> */}
    </>
  )
}

export default App
