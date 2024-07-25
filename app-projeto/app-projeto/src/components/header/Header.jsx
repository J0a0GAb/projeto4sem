
import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { BUTTON_SIZE_SHOW_MESSAGE, DEFAULT_IMAGEM_THUMBNAIL, HTTP_STATUS_NO_CONTENT, SERVIDOR_POST_IMAGEM_THUMBNAIL, UNDEFINED } from '../../config/config';
import useLogin from '../../hooks/useLogin';
import { logoutSistema } from '../../services/LoginService';
import { ShowError } from "../../components/mensagens/ShowError";

const Header = ({isToogle}) => {
    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();
    const {
      getAccessToken,
      getRefreshToken,
      getNomeUsuario,
      getFotoUsuario,
      logout } = useLogin()


    const nome = getNomeUsuario();
    const foto = getFotoUsuario();
    const access_token = getAccessToken();
    const refresh_token = getRefreshToken();

    const toggleClick = () => {
      setToggled(!toggled);
      isToogle(toggled)
    }

    const sair = async  () => {
      const response = await logoutSistema(access_token,refresh_token)
      .catch((error)=>{
        if (!error.response){
            ShowError(error.code);
        } else {
          console.log(response.data);
        }
      });
      logout();
      navigate("/login");
    }

    return (
      <Fragment>
        <header className="app-header">
          <div className="app-leftarea">
            <h4>
              SISTEMA<span>IFSP</span>
            </h4>
          </div>
          <div className="app-toggle">
            <i id="sidebar_toggle">
              <FaIcons.FaBars
                onClick={() => toggleClick()}
              />
            </i>
          </div>
          <div className="app-profile">
            <img
                src={
                    foto === null
                       ? DEFAULT_IMAGEM_THUMBNAIL
                       : `${SERVIDOR_POST_IMAGEM_THUMBNAIL}${foto}`
                }
                alt="foto"
                className="img-avatar__header"
            />
            <span>{nome}</span>
            <div className="app-logout">
              <i>
                <FaIcons.FaSignOutAlt size={BUTTON_SIZE_SHOW_MESSAGE}
                   onClick={() => sair()}
                />
              </i>
            </div>
          </div>
        </header>
      </Fragment>
    );
}

export default Header





