import React from 'react';

import ListagemMedicos from './views/listagem-medicos';
import ListagemPacientes from './views/listagem-pacientes';
import ListagemSecretarias from './views/listagem-secretarias';
import ListagemConsultas from './views/listagem-consultas';
import ListagemProcedimentos from './views/listagem-procedimentos';

import CadastroMedico from './views/cadastro-medico';
import CadastroPaciente from './views/cadastro-paciente';
import CadastroSecretaria from './views/cadastro-secretaria';
import CadastroConsulta from './views/cadastro-consulta';
import CadastroProcedimento from './views/cadastro-procedimento';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>

        <Route
            path='/cadastro-medico/:idParam?'
            element={<CadastroMedico />}
        />

        <Route
            path='/cadastro-paciente/:idParam?'
            element={<CadastroPaciente />}
        />

        <Route
            path='/cadastro-secretaria/:idParam?'
            element={<CadastroSecretaria />}
        />

        <Route
            path='/cadastro-consulta/:idParam?'
            element={<CadastroConsulta/>}
        />

        <Route
            path='/cadastro-procedimento:idParam?'
            element={<CadastroProcedimento/>}
        />

        <Route 
          path='/listagem-medicos' 
          element={<ListagemMedicos />} 
        />

        <Route 
          path='/listagem-pacientes' 
          element={<ListagemPacientes/>} 
        />

        <Route 
          path='/listagem-secretarias' 
          element={<ListagemSecretarias/>} 
        />

        <Route 
          path='/listagem-consultas' 
          element={<ListagemConsultas/>} 
        />

        <Route 
          path='/listagem-procedimentos' 
          element={<ListagemProcedimentos/>} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;