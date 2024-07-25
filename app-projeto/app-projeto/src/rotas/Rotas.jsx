import React from "react";

import { Route, Routes } from "react-router-dom";

import AlterarUsuario from "../paginas/usuario/Alterar";
import ConsultarUsuario from "../paginas/usuario/Consultar";
import ExcluirUsuario from "../paginas/usuario/Excluir";
import IncluirUsuario from "../paginas/usuario/Incluir";
import ListarUsuario from "../paginas/usuario/Listar";

import Dashboard from "../paginas/Dashboard";
import AlterarRole from "../paginas/role/Alterar";
import ConsultarRole from "../paginas/role/Consultar";
import ExcluirRole from "../paginas/role/Excluir";
import IncluirRole from "../paginas/role/Incluir";
import ListarRole from "../paginas/role/Listar";
import ManutencaoRole from "../paginas/role_usuario/ManutencaoRole";


import Login from "../paginas/login/Login";
import PrivateRoute from './PrivateRoute';

const Rotas = () => {
  return (
       <>
       <Routes>
          <Route path="/" element={<Login/>} exact />
          <Route path="/login" element={<Login/>} />
          <Route element={<PrivateRoute />} >

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/usuario/listar" element={<ListarUsuario />} />
            <Route path="/usuario/incluir" element={<IncluirUsuario />} />
            <Route path="/usuario/alterar/:id" element={<AlterarUsuario />} />
            <Route path="/usuario/excluir/:id" element={<ExcluirUsuario />} />
            <Route path="/usuario/consultar/:id"
                   element={<ConsultarUsuario />}
            />

            <Route path="/role/listar" element={<ListarRole />} />
            <Route path="/role/incluir" element={<IncluirRole />} />
            <Route path="/role/alterar/:id" element={<AlterarRole />} />
            <Route path="/role/excluir/:id" element={<ExcluirRole />} />
            <Route path="/role/consultar/:id" element={<ConsultarRole />} />

            <Route path="/role/adicionar/:id" element={<ManutencaoRole />} />
          </Route>
          </Routes>
        </>
  );
};

export default Rotas;
