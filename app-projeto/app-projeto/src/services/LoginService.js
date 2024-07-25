import http from '../config/http';

const loginUsuario = async (login) =>{
    return (
        http({
             method: 'POST',
             url: '/login',
             data:login
        }).then((response)=>{
            return response;
        }))
}

const refreshToken = async (access_token,refresh_token) => {
  let TokenRefreshRequest = {
    access_token,
    refresh_token,
  }

  return (
    http({
      method:"POST",
      url:"/refreshToken",
      data:TokenRefreshRequest,
    }).then((response)=>{
      return response;
    })
  )
}

const logoutSistema = async (access_token,refresh_token) => {

  let TokenRefreshRequest = {
    access_token,
    refresh_token,
  }

  return (
    http({
      method:"POST",
      url:"/logout",
      data:TokenRefreshRequest,
    }).then((response)=>{
      return response;
    })
  )
}

const validarAccessToken = async (access_token,refresh_token) => {

  let TokenRefreshRequest = {
    access_token,
    refresh_token,
  }

  return (
    http({
      method:"POST",
      url:"/validartoken",
      data:TokenRefreshRequest,
    }).then((response)=>{
      return response;
    })
  )
}




export {
  loginUsuario,
  refreshToken,
  logoutSistema,
  validarAccessToken,
};

