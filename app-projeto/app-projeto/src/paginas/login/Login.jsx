import { Fragment, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MensagemErro from "../../components/mensagens/MensagemErro";
import {
  BUTTON_SIZE_SHOW_MESSAGE,
  } from "../../config/config";
import useLogin from "../../hooks/useLogin";
import { loginUsuario } from "../../services/LoginService";
import "./login.css";
import { ERRORS, LOGINSYS } from "./Loginsys";

const Login = () => {
  const [login, setLogin] = useState(LOGINSYS);
  const [errors, setErrors] = useState(ERRORS);

  const navigate = useNavigate();
  const { loginSistema } = useLogin();


  const onSubmitForm = async (e) => {
    e.preventDefault();
      const response = await loginUsuario(login)
      const { objeto } = response.data;
      loginSistema(objeto);
      navigate("/dashboard");
      setErrors(ERRORS);
  }


  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
     })
  }


  return (
    <Fragment>
      <section className="material-half-bg">
        <div className="cover"></div>
      </section>
      <section className="login-content">
        <div className="logo">
          <h1>Projeto</h1>
        </div>
        <div className="login-box">
          <div className="col-xs-12 col-sm-12 col-md-8">
            <form className="login-form" onSubmit={onSubmitForm}>
              <h3 className="login-head">
                <div className="login-head__logo">
                  <FaIcons.FaUser size={60} />
                  Acessar Sistema
                </div>
              </h3>
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="email" className="control-label app-label">
                      E-mail:
                    </label>
                    <input
                      className={
                        errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={onChangeLogin}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="control-label app-label"
                    >
                      Senha:
                    </label>
                    <input
                      className={
                        errors.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={onChangeLogin}
                    />
                    {
                      errors.password ? (
                      <MensagemErro mensagem={errors.username} />
                    ) : null }
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="utility mt-3">
                  <p className="semibold-text mb-3">
                    <Link to="/recuperar">Recuperar Senha?</Link>
                  </p>
                  <p className="semibold-text mb-3">
                    <Link to="/registro">Registrar-se ?</Link>
                  </p>
                </div>
              </div>
              <div className="colx-xs-12 col-sm-12 col-md-12 mb-3 mt-3">
                <button
                  className="btn btn-primary btn-block app-button app-label"
                  type="submit"
                  title="Acessar o sistema"
                >
                  Acessar&nbsp;&nbsp;
                  <FaIcons.FaSignInAlt size={BUTTON_SIZE_SHOW_MESSAGE} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
