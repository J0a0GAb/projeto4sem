import React, { Fragment, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import { ShowError } from "../../components/mensagens/ShowError";
import ShowMensagem from "../../components/mensagens/ShowMensagem";
import { BUTTON_SIZE, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_OK, UNDEFINED } from "../../config/config";

import { lerRolePorId } from "../../services/RoleService";

const Consultar = () => {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");


  const { id } = useParams();

  useEffect(() => {
    const lerRole = async () => {
      const response = await lerRolePorId(id)
        .catch((error) => {
          if (!error.response){
            ShowError(error.code);
          } else {
            const { status, mensagem } = error.response.data;
            if (status >= HTTP_STATUS_BAD_REQUEST) {

            }
          }
         });
         if (typeof response != UNDEFINED) {
          const { status, objeto } = response.data;
          if (status === HTTP_STATUS_OK) {
            setNome(objeto.nome);
            setSigla(objeto.sigla);
          }
        }
    };
    lerRole();
  }, [id]);

  return (
    <Fragment>
      <ShowMensagem
        titulo="Direitos de acesso"
        descricao="Consulta dos dados de direito de acesso no sistema"
        iconTitulo={<FaIcons.FaRegAddressCard />}
        iconReturn={<MdIcons.MdList />}
        caminho="Direito de Acesso"
        url="/role/listar"
        tituloUrl="Lista de direitos de acesso"
      />
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
          <div className="app-windows">

            <form className="mt-3">
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="nome" className="control-label">
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
                        defaultValue={nome}
                        className="form-control app-label"
                      />
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
                        defaultValue={sigla}
                        className="form-control app-label"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-3">
                  <Link
                    to="/role/listar"
                    type="button"
                    title="Encerrar consulta do usuário"
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

export default Consultar;
