import P from 'prop-types';
import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

import { ShowError } from "../../components/mensagens/ShowError";
import {
  BUTTON_SIZE,
  DANGER,
  DEFAULT_IMAGEM,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_OK,
  SERVIDOR_POST_IMAGEM,
  SUCCESS,
  UNDEFINED,
} from "../../config/config";

import {
  alterarStatusUsuario,
  lerUsuarioPorId,
} from "../../services/UsuarioService";

const Status = ({ id, titulo, showModal=false, onCloseModal }) => {
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");
  const [selected, setSelected] = useState(false);



  useEffect(() => {
    const lerUsuario = async () => {
      const response = await lerUsuarioPorId(id)
        .catch((error) => {
          if (!error.response){
            ShowError(error.code)
          } else {
            const {mensagem} = error.response.data;

          }
        });
        if (typeof (response) != UNDEFINED) {
          const { objeto } = response.data;
          setUsername(objeto.username);
          setEmail(objeto.email);
          setStatus(objeto.ativo);
          setFoto(objeto.foto);
        }
    };
    lerUsuario();
  }, [id]);

  const onSubmitData = async (e) => {
    e.preventDefault();
    const response = await alterarStatusUsuario(id, status)
      .catch((error) => {
        if (!error.response){
          ShowError(error.code);
        } else {
          const {status, mensagem} = response.data;
          if (status >= HTTP_STATUS_BAD_REQUEST){

          }
        }
    });
    if (typeof (response) != UNDEFINED) {
      const {status, mensagem, objeto} = response.data;
      if (status === HTTP_STATUS_OK) {

        setStatus(objeto.ativo);
      }
    }
  };

  const onClose = (e) => {
    e.preventDefault();
    onCloseModal(status);
  };

  const changeStatus = (e) => {
    const { checked } = e.currentTarget;
    setSelected(checked);
    setStatus((status) => !status);
  };

  return (
    <Fragment>
      <div className="container pt-5">
        <Modal show={showModal} dialogClassName="app-my-modal" centered>
          <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Fragment>
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
                        <form className="mt-3">
                          <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <label
                                  htmlFor="username"
                                  className="control-label app-label"
                                >
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
                                    className="form-control app-label"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <label
                                  htmlFor="email"
                                  className="control-label app-label"
                                >
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
                                    className="form-control app-label"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                              <input
                                type="checkbox"
                                id="ativo"
                                checked={selected}
                                className="btn-check"
                                value={status}
                                onChange={(e) => changeStatus(e)}
                              />
                              {!status ? (
                                <label
                                  className="btn btn-danger app-label"
                                  htmlFor="ativo"
                                >
                                  Usuário Bloqueado&nbsp;&nbsp;
                                  <i>
                                    <BsIcons.BsPersonFillLock
                                      size={BUTTON_SIZE}
                                    />
                                  </i>
                                </label>
                              ) : (
                                <label
                                  className="btn btn-outline-success app-label"
                                  htmlFor="ativo"
                                >
                                  Usuário Ativo&nbsp;&nbsp;
                                  <i>
                                    <BsIcons.BsPersonFillCheck
                                      size={BUTTON_SIZE}
                                    />
                                  </i>
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-4">
                              <button
                                title="Alterar status do usuário"
                                className="btn btn-success btn-lg app-button app-label"
                                onClick={(e) => onSubmitData(e)}
                              >
                                Salvar &nbsp;&nbsp;
                                <FaIcons.FaSave size={BUTTON_SIZE} />
                              </button>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-4">
                              <button
                                type="button"
                                title="Cancelar a alteração do status do usuário"
                                className="btn btn-warning btn-lg app-button app-label"
                                onClick={(e) => onClose(e)}
                              >
                                Fechar &nbsp;&nbsp;
                                <MdIcons.MdCancel size={BUTTON_SIZE} />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

Status.propTypes = {
  id: P.number.isRequired,
  titulo: P.number.isRequired,
  showModal:P.bool.isRequired,
  onCloseModal:P.func.isRequired,

}

export default Status;
