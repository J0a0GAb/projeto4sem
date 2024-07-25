
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { refreshToken } from '../services/LoginService';
import { getAccessTokenStorage, getRefreshTokenStorage, setLogin } from '../services/StorageService';
import { HTTP_STATUS_OK, SERVIDOR, UNDEFINED } from './config';

let access_token = null;
let refresh_token = null;

const http = axios.create({
    baseURL:SERVIDOR,
})

const getToken = () => {
    access_token = getAccessTokenStorage() ? getAccessTokenStorage() : null;
    refresh_token = getRefreshTokenStorage() ? getRefreshTokenStorage() : null;
}

http.interceptors.request.use(async function(config) {

  config.headers["Accept"] = "application/json";

  getToken();

  if (access_token){

    config.headers["Authorization"] = `Bearer ${access_token}`;

    const user = jwt_decode(access_token);


    if (user){

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if(!isExpired) return config;

        config.headers["Authorization"] = `Bearer ${refresh_token}`;
        const response = await refreshToken(access_token, refresh_token);

        if (typeof (response) != UNDEFINED) {
          const { status, objeto } = response.data;
          if ( status === HTTP_STATUS_OK){
            setLogin(objeto);
            config.headers["Authorization"] = `Bearer ${objeto.access_token}`;
          }
        }
     }
  }
  return config;

}, function(error){
   return Promise.reject(error);
});



http.interceptors.response.use(function(response){
    return response;
});

export default http;



