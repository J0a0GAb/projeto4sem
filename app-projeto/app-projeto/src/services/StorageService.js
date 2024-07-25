import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

export function setLogin( usuario ) {
    sessionStorage.setItem(ACCESS_TOKEN, usuario.access_token);
    sessionStorage.setItem(REFRESH_TOKEN, usuario.refresh_token);
}

export function logoutSystems () {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
}

export function getAccessTokenStorage() {
   const access_token = sessionStorage.getItem(ACCESS_TOKEN);
   return access_token ?? null;
}

export function getRefreshTokenStorage() {
  const refresh_token = sessionStorage.getItem(REFRESH_TOKEN);
  return refresh_token ?? null;
}


export function getLoginStorage(){
  const access_token = getAccessTokenStorage();
  return access_token ? true : false;
}

export function getNomeUsuarioStorage() {
  const access_token = getAccessTokenStorage();
  const user = jwt_decode(access_token);
  return user.nome ?? null;
}

export function getFotoUsuarioStorage() {
  const access_token = getAccessTokenStorage();
  const user = jwt_decode(access_token);
  return user.foto ?? null;
}



//sessionStorage.setItem(USUARIO, JSON.stringify(usuario));
//JSON.parse(usuario)
