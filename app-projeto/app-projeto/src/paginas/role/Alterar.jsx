import React, { Fragment, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import MensagemErro from "../../components/mensagens/MensagemErro";
import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import {
  BUTTON_SIZE,
  DANGER,
  HTTP_STATUS_OK,
  HTTP_STATUS_PRECONDITION_FAILED,
  SUCCESS,
  UNDEFINED
} from "../../config/config";

import { alterarRole, lerRolePorId } from "../../services/RoleService";
import { ERRORS, ROLE } from "./Role";
import useValidarFormRole from "./ValidarRoleForm";

const Alterar = () => {
  const { id } = useParams();
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



  useEffect(() => {
    const lerRole = async () => {
      let erros = validateAll();
      if (isValid(erros)) {
        const response = await lerRolePorId(id).catch((error) => {
          if (!error.response) {
            ShowError(error.code);
          } else {
            const { status, mensagem, fields } = response.data;
            if (status === HTTP_STATUS_PRECONDITION_FAILED) {

              erros = validarRoleFromServer(fields);
              setErrors({ ...erros });
            } else {

            }
          }
        });
        if (typeof response != UNDEFINED) {
          const { status, mensagem, objeto } = response.data;
          if (status === HTTP_STATUS_OK) {

            setRole(objeto);
          }
        }
      }
    };
    lerRole();
  }, [id, setRole]);

  const onSubmitData = async (e) => {
    e.preventDefault();
    let erros = validateAll();
    if (isValid(erros)) {
      const response = await alterarRole(id, role).catch((error) => {
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
        if (status === HTTP_STATUS_OK) {

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
        descricao="Alteração dos dados de direito de acesso no sistema"
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
                      {errors.nome ? (
                        <MensagemErro mensagem={errors.nome} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="sigla" className="control-label app-label">
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
                    title="Alterar dados do novo usuário"
                    className="btn btn-success btn-lg app-button app-label"
                    disabled={!isFormValid()}
                  >
                    Salvar Cadastro&nbsp;&nbsp;
                    <FaIcons.FaPencilAlt size={BUTTON_SIZE} />
                  </button>
                </div>
                <div className="col-xs-12 col-md-3">
                  <Link
                    to="/role/listar"
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
    </Fragment>
  );
};

export default Alterar;
