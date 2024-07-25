import React, { Fragment } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";

import MensagemErro from "../../components/mensagens/MensagemErro";
import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import {
  BUTTON_SIZE,
  DANGER,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_PRECONDITION_FAILED,
  SUCCESS,
  UNDEFINED
} from "../../config/config";

import { incluirRole } from "../../services/RoleService";
import { ERRORS, ROLE } from "./Role";
import useValidarFormRole from "./ValidarRoleForm";



const Incluir = () => {
  const {
    role,
    setRole,
    errors,
    setErrors,
    isValid,
    validateAll,
    validBlurInput,
    isFormValid,
    validarRoleFromServer,
  } = useValidarFormRole(ROLE, ERRORS);



  const onSubmitData = async (e) => {
    e.preventDefault();
    let erros = validateAll();

    if (isValid(erros)) {
          const response = await incluirRole(role).catch((error) => {
            if (!error.response){
              ShowError(error.code);
            } else  {
              const { status, mensagem, fields } = response.data;
              if (status === HTTP_STATUS_PRECONDITION_FAILED) {

                erros = validarRoleFromServer(fields);
                setErrors({ ...erros });
              } else  {

              }
            }
          });
          if (typeof (response) != UNDEFINED) {
            const { status, mensagem } = response.data;
            if (status === HTTP_STATUS_CREATED) {

                setRole(ROLE);
            }
          }
    } else {
       setErrors({ ...erros });

     }
  };

  const handleBlurRoleDate = (e) => {
    const { currentTarget: input } = e;
    let erros = validBlurInput(input.name);
    if (!isValid(erros)) {
      setErrors({ ...erros });

    } else {
      setErrors({ ...erros });
    }
  };

  const handleChangeRoleDate = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };


  return (
    <Fragment>
      <ShowMensagem
        titulo="Direitos de acesso"
        descricao="Inclusão dos direitos de acesso no sistema"
        iconTitulo={<FaIcons.FaRegAddressCard />}
        iconReturn={<MdIcons.MdList />}
        caminho="Direito de Acesso"
        url="/role/listar"
        tituloUrl="Lista de direitos de acesso"
      />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
          <div className="app-windows">

            <form className="mt-3" onSubmit={onSubmitData}>
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="nome" className="control-label app-label">
                      Nome:
                    </label>
                    <div className="input-group">
                      <div className="input-group-preappend">
                        <span className="input-group-text">
                          <i>
                            <FaIcons.FaCreativeCommonsBy />
                          </i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={role.nome}
                        onChange={handleChangeRoleDate}
                        onBlur={handleBlurRoleDate}
                        className={
                          errors.nome
                            ? "form-control is-invalid"
                            : "form-control app-label"
                        }
                      />
                      {errors.nome ? <MensagemErro mensagem={errors.nome} /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="username" className="control-label app-label">
                      Sigla:
                    </label>
                    <div className="input-group">
                      <div className="input-group-preappend">
                        <span className="input-group-text">
                          <i>
                            <MdIcons.MdDescription />
                          </i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="sigla"
                        name="sigla"
                        value={role.sigla}
                        onChange={handleChangeRoleDate}
                        onBlur={handleBlurRoleDate}
                        className={
                          errors.sigla
                            ? "form-control is-invalid"
                            : "form-control app-label"
                        }
                      />
                      {errors.sigla ? (
                        <MensagemErro mensagem={errors.sigla} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-3">
                  <button
                    type="submit"
                    title="Incluir dados do novo direito de acesso"
                    className="btn btn-success btn-lg app-button app-label"
                    disabled={!isFormValid()}
                  >
                    Salvar Cadastro&nbsp;&nbsp;
                    <FaIcons.FaSave size={BUTTON_SIZE} />
                  </button>
                </div>
                <div className="col-xs-12 col-md-3">
                  <Link
                    to="/role/listar"
                    type="button"
                    title="Cancelar a inclusão do direito de acesso"
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
    </Fragment>
  );
};

export default Incluir;
