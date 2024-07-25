import React, { Fragment, useEffect, useRef, useState } from "react";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import MensagemErro from "../../components/mensagens/MensagemErro";
import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import {
  BUTTON_SIZE,
  BUTTON_SIZE_SHOW_MESSAGE,
  DEFAULT_IMAGEM,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_OK,
  HTTP_STATUS_PRECONDITION_FAILED,
  SERVIDOR_POST_IMAGEM,
  UNDEFINED,
} from "../../config/config";
import { deleteFoto, postFoto } from "../../services/FotoService";
import { alterarUsuario, lerUsuarioPorId } from "../../services/UsuarioService";
import { ERRORS, USUARIO } from "./Usuario";
import useValidarFormUsuario from "./ValidarUsuarioForm";


const Alterar = () => {
  const { id } = useParams();
  const {
    usuario,
    setUsuario,
    errors,
    setErrors,
    isValid,
    validateAll,
    validBlurInput,
    isFormValid,
    validarUsuarioFromServer,
  } = useValidarFormUsuario(USUARIO, ERRORS);

  const [foto, setFoto] = useState("");
  const uploadedImage = useRef(null);
  const imageUpLoader = useRef(null);
  const nomeFoto = useRef(null);
  const contentType = useRef(null);


  useEffect(() => {
    const lerUsuario = async () => {
      const response = await lerUsuarioPorId(id)
        .catch((error) => {
          if (!error.response) {
            ShowError(error);
          } else {
            const { status } = response.data;
            if (status >= HTTP_STATUS_BAD_REQUEST) {
            }
          }
        });
      if (typeof (response) != UNDEFINED) {
        const { objeto } = response.data;
        setUsuario(objeto);
      }
    };
    lerUsuario();
  }, [id, setUsuario]);

  const onSubmitData = async (e) => {
    e.preventDefault();
    let erros = validateAll();
    usuario.foto = nomeFoto.current.value;
    usuario.contentType = contentType.current.value;
    if (isValid(erros)) {
      const response = await alterarUsuario(id, usuario)
        .catch((error) => {
          if (!error.response) {
            ShowError(error.code);
          } else {
            const { status, mensagem } = response.data;
            if (status === HTTP_STATUS_PRECONDITION_FAILED) {
              const { fields } = response.data;

              erros = validarUsuarioFromServer(fields);
              setErrors({ ...erros });
            } else {

            }
          }
        });
      if (typeof (response) != UNDEFINED) {
        const { status, mensagem } = response.data;
        if (status === HTTP_STATUS_OK) {

          setUsuario(USUARIO);
          imageUpLoader.current.value = '';
          uploadedImage.current.value = "";
          setFoto('');
        }
      }
    } else {

    }
  };

  const handleBlurUsuarioDate = (e) => {
    const { currentTarget: input } = e;
    let erros = validBlurInput(input.name);
    if (!isValid(erros)) {
      setErrors({ ...erros });

    } else {
      setErrors({ ...erros });
    }
  };

  const handleChangeUsuarioDate = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const selectArquivo = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append("id", id);
      formData.append("foto", file);
      const response = await postFoto(formData)
        .catch((error) => {
          if (!error.response) {
            ShowError(error);
          } else {
            const { mensagem } = response.data;

          }
        })
      if (typeof (response) != UNDEFINED) {
        const { status } = response.data;
        if (status === HTTP_STATUS_OK) {
          const { objeto } = response.data;
          contentType.current.value = objeto.contentType;
          nomeFoto.current.value = objeto.nomeArquivo;
          setFoto(objeto.nomeArquivo);
          imageUpLoader.current.value = '';
        }
      }
    }
  };

  const excluirFoto = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", id);
    formData.append("nomeArquivo", foto);
    const response = await deleteFoto(formData)
      .catch((error) => {
      if (!error.response) {
           ShowError(error);
      } else {
        const { mensagem } = response.data;

      }
      });
      if (typeof (response) != UNDEFINED) {
        const { status } = response.data;
        if ( status === HTTP_STATUS_NO_CONTENT) {
          contentType.current.value = "";
          nomeFoto.current.value = "";
          uploadedImage.current.value = "";
          setFoto(response.objeto.nomeArquivo);
        }
    }
    imageUpLoader.current.value = '';
  };

  return (
    <Fragment>
      <ShowMensagem
        titulo=" Usuários"
        descricao="Alteração dos dados do usuário cadastrado no sistema"
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
                      <input
                        type="hidden"
                        id="foto"
                        name="foto"
                        ref={nomeFoto}
                      />
                      <input
                        type="hidden"
                        id="contentType"
                        name="contentType"
                        ref={contentType}
                      />
                      <img
                        src={
                          foto === ""
                            ? DEFAULT_IMAGEM
                            : `${SERVIDOR_POST_IMAGEM}${foto}`
                        }
                        ref={uploadedImage}
                        className="avatar"
                        onClick={excluirFoto}
                        alt="Usuário"
                      />
                      <div className="mt-3 col-xs-12 col-sm-12 col-md-10">
                        <div className="fileInput">
                          <input
                            type="file"
                            ref={imageUpLoader}
                            onChange={selectArquivo}
                          />
                          <button
                            id="upload"
                            className="btn btn-success btn-lg upload"
                            title="Upload de foto"
                          >
                            <i>
                              <FaIcons.FaUpload size={BUTTON_SIZE} />
                            </i>
                          </button>
                        </div>
                      </div>
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
                            value={usuario.username}
                            onChange={handleChangeUsuarioDate}
                            onBlur={handleBlurUsuarioDate}
                            className={
                              errors.username
                                ? "form-control is-invalid"
                                : "form-control app-label"
                            }
                          />
                          {errors.username ? (
                            <MensagemErro mensagem={errors.username} />
                          ) : null}
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
                            value={usuario.email}
                            onChange={handleChangeUsuarioDate}
                            onBlur={handleBlurUsuarioDate}
                            className={
                              errors.email
                                ? "form-control is-invalid"
                                : "form-control app-label"
                            }
                          />
                          {errors.email ? (
                            <MensagemErro mensagem={errors.email} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="password" className="control-label">
                          Senha:
                        </label>
                        <div className="input-group">
                          <div className="input-group-preappend">
                            <span className="input-group-text">
                              <i>
                                <MdIcons.MdEnhancedEncryption />
                              </i>
                            </span>
                          </div>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={usuario.password}
                            onChange={handleChangeUsuarioDate}
                            onBlur={handleBlurUsuarioDate}
                            autoComplete="off"
                            className={
                              errors.password
                                ? "form-control is-invalid"
                                : "form-control app-label"
                            }
                          />
                          {errors.password ? (
                            <MensagemErro mensagem={errors.password} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="confirmPassword"
                          className="control-label"
                        >
                          Confirmar Senha:
                        </label>
                        <div className="input-group">
                          <div className="input-group-preappend">
                            <span className="input-group-text">
                              <i>
                                <MdIcons.MdEnhancedEncryption />
                              </i>
                            </span>
                          </div>
                          <input
                            type="password"
                            id="confirmePassword"
                            name="confirmePassword"
                            value={usuario.confirmePassword}
                            onChange={handleChangeUsuarioDate}
                            onBlur={handleBlurUsuarioDate}
                            autoComplete="off"
                            className={
                              errors.confirmePassword
                                ? "form-control is-invalid"
                                : "form-control app-label"
                            }
                          />
                          {errors.confirmPassword ? (
                            <MensagemErro mensagem={errors.confirmePassword} />
                          ) : null}
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
                        defaultValue={usuario.ativo}
                      />
                      {!usuario.ativo ? (
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
                    <div className="col-xs-12 col-sm-12 col-md-4">
                      <button
                        type="submit"
                        title="Alterar dados do novo usuário"
                        className="btn btn-success btn-lg app-button app-label"
                        disabled={!isFormValid()}
                      >
                        Salvar Cadastro&nbsp;&nbsp;
                        <FaIcons.FaPencilAlt size={BUTTON_SIZE} />
                      </button>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4">
                      <Link
                        to="/usuario/listar"
                        type="button"
                        title="Cancelar alteração do usuário"
                        className="btn btn-warning btn-lg app-button app-label"
                      >
                        Cancelar Cadastro&nbsp;&nbsp;
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

export default Alterar;
