import React, { Fragment, useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import Pagination from "../../components/pagination/Pagination";
import SelectNumberPages from "../../components/pagination/SelectNumberPages";
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  UNDEFINED,
} from "../../config/config";

import { listagemRolesPorNome } from "../../services/RoleService";

const Listar = () => {
  const [roles, setRoles] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [props, setProps] = useState("id");
  const [dir, setDir] = useState("asc");
  const [totalElements, setTotalElements] = useState(0);
  const [key, setKey] = useState("");



  useEffect(() => {
    async function loadRoleByName() {
      const response = await listagemRolesPorNome(
        key,
        page,
        pageSize,
        dir,
        props
      ).catch((error)=>{
        if (!error.response){
          ShowError(error.code);
        } else  {
          const { mensagem } = error.response.data;

        }
      });
      if (typeof (response) != UNDEFINED)  {
        setPage(response.pageNumber);
        setPageSize(response.pageSize);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setRoles(response.content);
      }
    }
    loadRoleByName();
  }, [key, page, pageSize, dir, props]);

  const changePage = (pagina) => {
    setPage(pagina - 1);
  };

  const changePageSize = (tamanho) => {
    setPageSize(tamanho);
  };

  const onChangeNome = (nameKey) => {
    nameKey.trim().length > 0 ? setKey(nameKey) : setKey("");
  };

  const onSortProps = (e, atributo) => {
    e.preventDefault();
    const direcao = dir && dir === "asc" ? "desc" : "asc";
    setDir(direcao);
    setProps(atributo);
  };

  return (
    <Fragment>
      <ShowMensagem
        titulo="Manutenção de Roless"
        descricao="Listar os direitos de acessps cadastrados no sistema "
        iconTitulo={<FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE} />}
        iconReturn={<AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />}
        url="/dashboard"
        tituloUrl="Dashboard"
      />
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">

          <div className="app-windows">
            <form>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-4">
                  <SelectNumberPages
                    pageSize={pageSize}
                    changePageSize={(tamanho) => changePageSize(tamanho)}
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
            <div id="no_more_table">
              <table
                id="tabela-role"
                className="app-tabela table table-striped table-bordered table-hover cf"
              >
                <thead className="cf">
                  <tr>
                    <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white">
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
                    <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles &&
                    roles.map((role) => (
                      <tr
                        key={role.id}
                        className="app-coluna-detalhe-centro app-label"
                      >
                        <td data-label="Id">{role.id}</td>
                        <td data-label="Nome">{role.nome}</td>
                        <td data-label="E-mail">{role.sigla}</td>
                        <td data-label="Ações">
                          <Link
                            to={`/role/alterar/${role.id}`}
                            type="button"
                            title="Alterar dados do direito de acesso selecionado"
                            className="btn btn-secondary"
                          >
                            <i>
                              <FaIcons.FaPencilAlt size={BUTTON_SIZE} />
                            </i>
                          </Link>
                          <Link
                            to={`/role/excluir/${role.id}`}
                            type="button"
                            title="Excluir o direito de acesso selecionado"
                            className="btn btn-danger"
                          >
                            <i>
                              <FaIcons.FaTrash size={BUTTON_SIZE} />
                            </i>
                          </Link>
                          <Link
                            to={`/role/consultar/${role.id}`}
                            type="button"
                            title="Consultar dados do direito de acesso selecionado"
                            className="btn btn-info"
                          >
                            <i>
                              <FaIcons.FaSearchPlus size={BUTTON_SIZE} />
                            </i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                totalElements={totalElements}
                changePage={(pagina) => changePage(pagina)}
              />
              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-3 ml-5 ">
                  <Link
                    to="/role/incluir"
                    type="button"
                    title="Incluir dados de um novo direito de acesso"
                    className="btn btn-primary app-label app-button"
                  >
                    Incluir &nbsp;&nbsp;
                    <i>
                      <FaIcons.FaPlus size={BUTTON_SIZE} />
                    </i>
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

export default Listar;
