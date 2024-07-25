import React, { Fragment } from 'react';
import { LoginProvider } from './contexto/LoginContext';
import Rotas from './rotas/Rotas';

function App() {
  return (
     <Fragment>
       <LoginProvider>
         <Rotas/>
       </LoginProvider>
     </Fragment>
  );
}

export default App;
