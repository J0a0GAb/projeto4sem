import React, { Fragment, useEffect, useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DANGER,
  DEFAULT_IMAGEM,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
  SERVIDOR_POST_IMAGEM,

  UNDEFINED,
} from "../../config/config";

import { deleteFoto } from "../../services/FotoService";
import { excluirUsuario, lerUsuarioPorId } from "../../services/UsuarioService";

const Excluir = () => {
  const [ativo, SetAtivo] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const [foto, setFoto] = useState("");


  useEffect(() => {
    const lerUsuario = async () => {
      const response = await lerUsuarioPorId(id)
        .catch((error) => {
          if (!error.response) {
            ShowError(error.code);
          } else {
            const { status, mensagem } = response.data;
            if (status >= HTTP_STATUS_BAD_REQUEST) {
            }
          }
        });
      if (typeof (response) != UNDEFINED) {
        const { objeto } = response.data
        if (response.data?.status === HTTP_STATUS_OK) {
          setUsername(objeto.username);
          setEmail(objeto.email);
          SetAtivo(objeto.ativo);
          setFoto(objeto.foto);
        }
      }
    };
    lerUsuario();
  }, [id]);

  const onSubmitData = async (e) => {
    e.preventDefault();
    if (excluirFoto()) {
      const response = await excluirUsuario(id)
      .catch((error) => {
        if (!error.response) {
          ShowError(error);
        } else {
          const { status, mensagem } = response.data;
          if (status >= HTTP_STATUS_BAD_REQUEST) {
          }
        }
      });
      if (typeof (response) != UNDEFINED) {
        const { status, mensagem } = response.data;
        if (status === HTTP_STATUS_NO_CONTENT) {
          setUsername("");
          setEmail("");
          setFoto("");
        }
      }
    }
  };

  const excluirFoto = async () => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("nomeArquivo", foto);
    const response = await deleteFoto(formData).catch((error)=>{
      if (!error.response){
        ShowError(error.code)
      } else {
        const { mensagem } = error.response.data;
      }
    });
    if (typeof (response) != UNDEFINED) {
      const { status, mensagem, objeto } = response.data;
      if (status === HTTP_STATUS_NO_CONTENT) {
          setFoto(objeto.nomeArquivo);
          return true;
      } else {
        return false;
      }
    }
  };


  return (
    <Fragment>
      <ShowMensagem
        titulo="Usuários"
        descricao="Exclusão do usuário cadastrado no sistema"
        iconTitulo={<FaIcons.FaUserEdit size={BUTTON_SIZE_SHOW_MESSAGE} />}
        iconReturn={<MdIcons.MdList size={BUTTON_SIZE_SHOW_MESSAGE} />}
        caminho="Usuário"
        url="/usuario/listar"
        tituloUrl="Listagem de usuários"
      />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
          <div className="app-windows">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={
                          foto === ""
                            ? DEFAULT_IMAGEM
                            : `${SERVIDOR_POST_IMAGEM}${foto}`
                        }
                        className="avatar"
                        alt="Usuário"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="colpxs-12 col-sm-12 col-md-8">
                <form className="mt-3" onSubmit={onSubmitData}>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="username" className="control-label">
                          Nome:
                        </label>
                        <div className="input-group">
                          <div className="input-group-preappend">
                            <span className="input-group-text">
                              <i>
                                <FaIcons.FaUserCircle />
                              </i>
                            </span>
                          </div>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={username}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="email" className="control-label">
                          E-mail:
                        </label>
                        <div className="input-group">
                          <div className="input-group-preappend">
                            <span className="input-group-text">
                              <i>
                                <FaIcons.FaAt />
                              </i>
                            </span>
                          </div>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            defaultValue={email}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <input
                        type="radio"
                        className="btn-check btn-lg app-button app-label"
                        name="ativo"
                        id="ativo"
                        autoComplete="off"
                        defaultValue={ativo}
                      />
                      {!ativo ? (
                        <label
                          className="btn btn-danger app-label"
                          htmlFor="ativo"
                        >
                          Usuário Bloqueado&nbsp;&nbsp;
                          <i>
                            <BsIcons.BsPersonFillLock size={BUTTON_SIZE} />
                          </i>
                        </label>
                      ) : (
                        <label
                          className="btn btn-outline-success app-label"
                          htmlFor="Ativo"
                        >
                          Usuário Ativo&nbsp;&nbsp;
                          <i>
                            <BsIcons.BsPersonFillCheck size={BUTTON_SIZE} />
                          </i>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-md-4">
                      <button
                        type="submit"
                        title="Excluir dados do usuário"
                        className="btn btn-danger btn-lg app-button app-label"
                      >
                        Excluir Cadastro&nbsp;&nbsp;
                        <FaIcons.FaTrash size={BUTTON_SIZE} />
                      </button>
                    </div>
                    <div className="col-xs-12 col-md-4">
                      <Link
                        to="/usuario/listar"
                        type="button"
                        title="Cancelar exclusão do usuário"
                        className="btn btn-warning btn-lg app-button app-label"
                      >
                        Cancelar Exclusão&nbsp;&nbsp;
                        <MdIcons.MdCancel size={BUTTON_SIZE} />
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Excluir;
