import React, { Fragment, useEffect, useState } from "react";

import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import Pagination from "../../components/pagination/Pagination";
import SelectNumberPages from "../../components/pagination/SelectNumberPages";
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  HTTP_STATUS_OK,
  SUCCESS,
  UNDEFINED
} from "../../config/config";

import { listagemRolesPorNome } from "../../services/RoleService";
import {
  adicionarUsuarioRoles,
  lerUsuarioRolesPorId,
} from "../../services/UsuarioService";
import { USUARIO } from "../usuario/Usuario";

const ManutencaoRole = () => {
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [props, setProps] = useState("id");
  const [dir, setDir] = useState("asc");
  const [totalElements, setTotalElements] = useState(0);
  const [key, setKey] = useState("");
  const [usuario, setUsuario] = useState(USUARIO);



  useEffect(() => {
    async function loadRoleByName() {
      let role = [];
      const response = await listagemRolesPorNome(
        key,
        page,
        pageSize,
        dir,
        props
      ).catch((error) => {
        if (!error.response){
          ShowError(error.code);
        } else {
          const { mensagem } = error.response.data;

        }
      });
      if (typeof response != UNDEFINED) {
        const { pageNumber, pageSize, totalPages, totalElements, content} = response.data;
        setPage(pageNumber);
        setPageSize(pageSize);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
        for (let i = 0; i < content.length; i++) {
            role.push({
              id: content[i].id,
              nome: content[i].nome,
              sigla: content[i].sigla,
              check: false,
            });
        }
        const timeoutId =setTimeout(async () => {
          setRoles(role);
        }, 5000);
        return () => {
          clearTimeout(timeoutId);
        }
      }
    }
    loadRoleByName();
  }, [key, page, pageSize, dir, props]);

  useEffect(() => {
    const lerUsuario = async () => {
      const response = await lerUsuarioRolesPorId(id)
      .catch((error) => {
        if (!error.response){
          ShowError(error.code);
        } else {
          const { mensagem } = error.response.data;

        }

      });
      if (typeof response != UNDEFINED) {
        const { status, objeto } = response.data;
        if (status === HTTP_STATUS_OK) {
          setUsuario({
            ...usuario,
            id: objeto.id,
            username: objeto.username,
            email: objeto.email,
            password:objeto.password,
            confirmePassword:objeto.confirmePassword,
            foto:objeto.foto,
            contentType:objeto.contentType,
            ativo: objeto.ativo,
            roles: objeto.roles,
          });
        }
        const role = [...roles]
        for (let i = 0; i < role.length; i++) {
          for (let j = 0; j < usuario.roles.length; j++) {
            if (parseInt(role[i].id) === parseInt(usuario.roles[j].id)) {
              role[i].check = true;
            }
          }
        }
        setRoles(...role)
        console.log(roles);
      }
    };

    lerUsuario();
  }, [id]);

  const onChangeNome = (nameKey) => {
    nameKey.trim().length > 0 ? setKey(nameKey) : setKey("");
  };

  const changePage = (page) => {
    setPage(page - 1);
  };

  const onChangeCheckedRoles = (e, index) => {
    const listaRoles = [...roles];
    listaRoles[index].check = !listaRoles[index].check;
    setRoles(listaRoles);
    onChangeGrupo(e);
  };

  const changePageSize = (size) => {
    setPageSize(size);
  };

  const onChangeGrupo = (e) => {
    const listaRoles = [...roles];
    const { value } = e.target;
    let index = 0;
    for (let i = 0; i < usuario.roles.length; i++) {
      if (String(usuario.roles[i].id).trim() === value.trim()) {
        usuario.roles.splice(i, 1);
        index = 1;
      }
    }
    if (index !== 1) {
      for (let i = 0; i < listaRoles.length; i++) {
        if (String(listaRoles[i].id).trim() === value.trim()) {
          usuario.roles.push({
            id: listaRoles[i].id,
            nome: listaRoles[i].nome,
            sigla: listaRoles[i].sigla,
          });
        }
      }
    }
    salvarRoles()
  };

  const onSortProps = (e, atributo) => {
    e.preventDefault();
    const direcao = dir && dir === "asc" ? "desc" : "asc";
    setDir(direcao);
    setProps(atributo);
  };

  const salvarRoles = async () => {
    let usuarioRolesRequest = {
      id: usuario.id,
      roles: usuario.roles,
    };

    const response = await adicionarUsuarioRoles(usuarioRolesRequest)
    .catch((error) => {
        if (!error.response){
          ShowError(error.code);
        } else {
          const { mensagem } = error.response.data;

        }
      }
    );
    if (typeof response != UNDEFINED) {
       const { status, mensagem } = response.data;
       if (status === HTTP_STATUS_OK) {

       }
    }
  };


  return (
    <Fragment>
      <ShowMensagem
        titulo=" Direitos de Acesso"
        descricao="Incluir novos direitos de acesso para o usuário no sistema"
        iconTitulo={<FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />}
        iconReturn={<MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />}
        caminho="Usuário"
        url="/usuario/listar"
        tituloUrl="Listagem de usuários"
      />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
          <div className="app-windows">

            <div className="container pt-5">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label app-label">Usuário:</label>
                    <input
                      type="text"
                      id="id"
                      name="id"
                      className="form-control app-label"
                      defaultValue={usuario.username}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div id="no-more-tables">
                <form>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4">
                      <SelectNumberPages
                        pageSize={pageSize}
                        changePageSize={(size) => changePageSize(size)}
                      />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-8 ">
                      <label htmlFor="key" className="app-label col-form-label">
                        Filtro:
                      </label>
                      <div className="input-group">
                        <div className="input-group-preappend"></div>
                        <input
                          type="text"
                          id="key"
                          name="key"
                          value={key}
                          className="form-control"
                          onChange={(e) => onChangeNome(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <br />
                <table className="table table-stripped table-bordered table-hover cf">
                  <thead className="cf">
                    <tr>
                      <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white ">
                        <button
                          className="btn btn-link text-white app-text-underline app-label"
                          onClick={(e) => onSortProps(e, "id")}
                        >
                          Id
                          {props === "id" && (
                            <i
                              className={
                                dir === "asc" ? (
                                  <FaIcons.FaSortUp />
                                ) : (
                                  <FaIcons.FaSortDown />
                                )
                              }
                            ></i>
                          )}
                        </button>
                      </th>
                      <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white ">
                        <button
                          className="btn btn-link text-white app-text-underline app-label"
                          onClick={(e) => onSortProps(e, "nome")}
                        >
                          Nome
                          {props === "nome" && (
                            <i
                              className={
                                dir === "asc" ? (
                                  <FaIcons.FaSortUp />
                                ) : (
                                  <FaIcons.FaSortDown />
                                )
                              }
                            ></i>
                          )}
                        </button>
                      </th>
                      <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white ">
                        <button
                          className="btn btn-link text-white app-text-underline app-label"
                          onClick={(e) => onSortProps(e, "sigla")}
                        >
                          Sigla
                          {props === "sigla" && (
                            <i
                              className={
                                dir === "asc" ? (
                                  <FaIcons.FaSortUp />
                                ) : (
                                  <FaIcons.FaSortDown />
                                )
                              }
                            ></i>
                          )}
                        </button>
                      </th>
                      <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white ">
                        Direito de Acesso
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles &&
                      roles.map((r, index) => (
                        <tr
                          key={index}
                          className="app-coluna-detalhe-centro app-label"
                        >
                          <td data-label="Id">{r.id}</td>
                          <td data-label="Nome">{r.nome}</td>
                          <td data-label="Sigla">{r.sigla}</td>
                          <td data-label="Direito de Acesso">
                            <input
                              type="checkbox"
                              checked={r.check}
                              id={`check_${r.id}`}
                              name={`check_${r.id}`}
                              value={r.id}
                              className="btn-check"
                              onChange={(e) => onChangeCheckedRoles(e, index)}
                            />
                            {!r.check  ? (
                              <label
                                htmlFor={`check_${r.id}`}
                                className="btn btn-warning app-label"
                              >
                                Atribuído&nbsp;&nbsp;
                                <i>
                                  <BsIcons.BsPersonFillLock
                                    size={BUTTON_SIZE}
                                  />
                                </i>
                              </label>
                            ) : (
                              <label
                                htmlFor={`check_${r.id}`}
                                className="btn btn-outline-info app-label"
                              >
                                Não Atribuído&nbsp;&nbsp;
                                <i>
                                  <BsIcons.BsPersonFillCheck
                                    size={BUTTON_SIZE}
                                  />
                                </i>
                              </label>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {roles && (
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    changePage={(pagina) => changePage(pagina)}
                  />
                )}
              </div>
              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-4">
                  <Link
                    to="/usuario/listar"
                    type="button"
                    title="Cancelar a inclusão do usuário"
                    className="btn btn-warning btn-lg app-button app-label"
                  >
                    Cancelar Cadastro&nbsp;&nbsp;
                    <MdIcons.MdCancel size={BUTTON_SIZE} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManutencaoRole;
