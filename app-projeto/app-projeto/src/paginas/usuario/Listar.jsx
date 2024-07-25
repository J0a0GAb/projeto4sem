import React, { Fragment, useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import Pagination from "../../components/pagination/Pagination";
import SelectNumberPages from "../../components/pagination/SelectNumberPages";
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,

  DEFAULT_IMAGEM_THUMBNAIL,
  SERVIDOR_POST_IMAGEM_THUMBNAIL,
  UNDEFINED,
} from "../../config/config";

import { getRelatorioPdfFromApi, listagemUsuariosPorNome } from "../../services/UsuarioService";
import Status from "./Status";

const Listar = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [props, setProps] = useState("id");
  const [dir, setDir] = useState("asc");
  const [totalElements, setTotalElements] = useState(0);
  const [key, setKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [userId, setUserId] = useState('');
  const [ativo, setAtivo] = useState(false);



  useEffect(() => {
    async function loadUsuarioByName() {
      const response = await listagemUsuariosPorNome(
        key, page, pageSize, dir, props
      ).catch((error)=>{
        if (!error.response){
          ShowError(error.code);
        } else  {
          const { mensagem } = error.response.data;

        }
      });
      //console.log(response.data);
      if (typeof (response) != UNDEFINED) {
        const { pageNumber, pageSize, totalPages, totalElements, content } = response.data;
        setPage(pageNumber);
        setPageSize(pageSize);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
        setUsuarios(content);
      }
    }
    loadUsuarioByName();
  }, [key, page, pageSize, dir, props, ativo]);

  const changePage = (pagina) => {
     setPage(pagina - 1);
  };

  const changePageSize = (tamanho) => {
    setPageSize(tamanho);
  };

  const onChangeNome = (nameKey) => {
     nameKey.trim().length > 0 ? setKey(nameKey) : setKey('');
  };

  const onSortProps = (e, atributo) => {
    e.preventDefalt();
    const direcao = dir && dir === "asc" ? "desc" : "asc";
    setDir(direcao);
    setProps(atributo);
  };

  const onShowModal = (e) => {
    setShowModal(true);
    setSelected(true);
    setUserId(e.target.value);
  }

  const onCloseModal = (status) => {
    setShowModal(false);
    setSelected(false);
    setAtivo(status);
  };

  const  gerarPdf = async () => {
    const pdfProxy = await getRelatorioPdfFromApi()
      .catch((error) => {
        ShowError(error.code);
    });
    window.open(pdfProxy,'_blank');
  };

  return (
    <Fragment>
      <ShowMensagem
        titulo="Manutenção de Usuários"
        descricao="Listar os usuários cadastrados no sistema "
        iconTitulo={<FaIcons.FaListAlt size={BUTTON_SIZE_SHOW_MESSAGE} />}
        iconReturn={<AiIcons.AiFillDashboard size={BUTTON_SIZE_SHOW_MESSAGE} />}
        url="/dashboard"
        tituloUrl="Dashboard"
      />

      <div className="row justify-content-center">
        {showModal ? (
          <Status
            id={userId}
            showModal={onShowModal}
            titulo="Alterar status do usuário no sistema"
            onCloseModal={() => onCloseModal((status) => !status)}
          />
        ) : null}

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
                id="tabela-usuario"
                className="app-tabela table table-striped table-bordered table-hover cf"
              >
                <thead className="cf">
                  <tr>
                    <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label">
                      Foto
                    </th>
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
                        onClick={(e) => onSortProps(e, "username")}
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
                        onClick={(e) => onSortProps(e, "username")}
                      >
                        E-mail
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
                        onClick={(e) => onSortProps(e, "ativo")}
                      >
                        Ativo
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
                    <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label">
                      Ações
                    </th>
                    <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label">
                      Cadastrar Direitos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios &&
                    usuarios.map((usuario) => (
                      <tr
                        key={usuario.id}
                        className="app-coluna-detalhe-centro app-label"
                      >
                        <td data-label="foto">
                          <img
                            src={
                              usuario.foto === null
                                ? DEFAULT_IMAGEM_THUMBNAIL
                                : `${SERVIDOR_POST_IMAGEM_THUMBNAIL}${usuario.foto}`
                            }
                            alt="foto"
                            className="img-avatar"
                          />
                        </td>
                        <td data-label="Id">{usuario.id}</td>
                        <td data-label="Nome">{usuario.username}</td>
                        <td data-label="E-mail">{usuario.email}</td>
                        <td data-label="Ativo">
                          <input
                            type="checkbox"
                            id={`ativo_${usuario.id}`}
                            name={`ativo_${usuario.id}`}
                            className="btn-check"
                            checked={selected}
                            value={usuario.id}
                            onChange={(e) => showModal(e)}
                          />
                          {!usuario.ativo ? (
                            <label
                              htmlFor={`ativo_${usuario.id}`}
                              className="btn btn-danger app-label"
                            >
                              Usuário Bloqueado&nbsp;&nbsp;
                              <i>
                                <BsIcons.BsPersonFillLock size={BUTTON_SIZE} />
                              </i>
                            </label>
                          ) : (
                            <label
                              htmlFor={`ativo_${usuario.id}`}
                              className="btn btn-outline-success app-label"
                            >
                              Usuário Ativo&nbsp;&nbsp;
                              <i>
                                <BsIcons.BsPersonFillCheck size={BUTTON_SIZE} />
                              </i>
                            </label>
                          )}
                        </td>
                        <td data-label="Ações">
                          <Link
                            to={`/usuario/alterar/${usuario.id}`}
                            type="button"
                            title="Alterar dados do usuário selecionado"
                            className="btn btn-secondary"
                          >
                            <i>
                              <FaIcons.FaPencilAlt size={BUTTON_SIZE} />
                            </i>
                          </Link>
                          <Link
                            to={`/usuario/excluir/${usuario.id}`}
                            type="button"
                            title="Excluir o usuário selecionado"
                            className="btn btn-danger"
                          >
                            <i>
                              <FaIcons.FaTrash size={BUTTON_SIZE} />
                            </i>
                          </Link>
                          <Link
                            to={`/usuario/consultar/${usuario.id}`}
                            type="button"
                            title="Consultar dados do usuário selecionado"
                            className="btn btn-info"
                          >
                            <i>
                              <FaIcons.FaSearchPlus size={BUTTON_SIZE} />
                            </i>
                          </Link>
                        </td>
                        <td data-label="Cadastrar Direitos">
                          <Link to={`/role/adicionar/${usuario.id}`}
                            type="button"
                            title="Cadastrar Direitos de Acesso"
                            className="btn btn-success">
                            <i>
                              <AiIcons.AiFillSecurityScan size={BUTTON_SIZE} />
                            </i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              { usuarios && (
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  onChangePage={(pagina) => changePage(pagina)}
                />
              )}
              <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-3 ml-5 ">
                  <Link
                    to="/usuario/incluir"
                    type="button"
                    title="Incluir dados de um novo usuário"
                    className="btn btn-primary app-label app-button"
                  >
                    Incluir &nbsp;&nbsp;
                    <i>
                      <FaIcons.FaPlus size={BUTTON_SIZE} />
                    </i>
                  </Link>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3">
                  <button
                    onClick={gerarPdf}
                    type="button"
                    title="Relatório de usuário"
                    className="btn btn-success app-button app-label"
                  >
                    Relatório&nbsp;&nbsp;
                    <FaIcons.FaFilePdf size={BUTTON_SIZE} />
                  </button>
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
