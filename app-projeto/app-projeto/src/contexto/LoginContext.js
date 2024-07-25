
import { createContext, useEffect } from "react";
import {
  getAccessTokenStorage,
  getFotoUsuarioStorage,
  getNomeUsuarioStorage,
  getLoginStorage,
  getRefreshTokenStorage,
  logoutSystems,
  setLogin
} from "../services/StorageService";
import { validarAccessToken } from "../services/LoginService";

export const LoginContexto = createContext(null);

export const LoginProvider = ({ children }) => {


  useEffect(()=>{

    const validarToken = async () => {

        const access_token = getAccessTokenStorage() ?
                             getAccessTokenStorage() : null;

        const refresh_token = getRefreshTokenStorage() ?
                              getAccessTokenStorage() : null;

        if (access_token){
           const response = await validarAccessToken(access_token, refresh_token);

           const { objeto } = response.data;

           setLogin(objeto);
        }

    }

    validarToken();
  },[])



  const loginSistema = (usuario) => {
    setLogin(usuario);
  };

  const logout = () => {
    logoutSystems();
  };

  const getNomeUsuario = () => {
    return getNomeUsuarioStorage();
  };

  const getAccessToken = () => {
    return getAccessTokenStorage();
  };

  const getRefreshToken = () => {
    return getRefreshTokenStorage();
  };

  const getUsuarioLogado = () => {
     return getLoginStorage();
  };

  const getFotoUsuario = () => {
    return getFotoUsuarioStorage();
  }

  return (
    <LoginContexto.Provider
      value={{
        getUsuarioLogado,
        getNomeUsuario,
        getFotoUsuario,
        getAccessToken,
        getRefreshToken,
        loginSistema,
        logout,
      }}
    >
      {children}
    </LoginContexto.Provider>
  );
};

