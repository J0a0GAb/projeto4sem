
import IMAGEM from "../assets/img/avatar.png";
import IMAGEM_THUMBNAIL from "../assets/img/thumbnail.avatar.png";
import USER from "../assets/img/user.png";

export const SERVIDOR = "http://localhost:8080/rest";
export const HTTP_STATUS_OK                     = 200;
export const HTTP_STATUS_CREATED                = 201;
export const HTTP_STATUS_NO_CONTENT             = 204;
export const HTTP_STATUS_BAD_REQUEST            = 400;
export const HTTP_STATUS_UNAUTHORIZED           = 401;
export const HTTP_STATUS_NOT_FOUND              = 404;
export const HTTP_STATUS_NOT_ACCEPTABLE         = 406;
export const HTTP_STATUS_PRECONDITION_FAILED    = 412;
export const HTTP_STATUS_INTERNAL_SERVER_ERROR  = 500;

export const USER_PHOTO = USER;
export const DEFAULT_IMAGEM = IMAGEM;
export const DEFAULT_IMAGEM_THUMBNAIL = IMAGEM_THUMBNAIL;

export const SERVIDOR_POST_IMAGEM = SERVIDOR + "/foto/f/";
export const SERVIDOR_POST_IMAGEM_THUMBNAIL = SERVIDOR + "/foto/f/thumbnail.";

export const BUTTON_SIZE = 20;
export const BUTTON_SIZE_SHOW_MESSAGE = 30;

export const SUCCESS = 'success';
export const DANGER = 'danger';
export const INFO = 'info';
export const WARNING = 'warning';
export const UNDEFINED = 'undefined';

