
import P from 'prop-types';

export const ShowError = (code) => {
    const errorCode = {
        ERR_NETWORK: "Sem rede para acesso",
        ERR_TIMEOUT: "Tempo esgotado",
        ERR_CANCEL: "Solicitação cancelada",
        ERR_UNKNOWN: "Erro desconhecido",
        ERR_BAD_REQUEST: "Dados solicitados de forma incorreta!",
        ERR_UNAUTHORIZED: "Acesso não autorizado",
        ERR_NOT_FOUND: "Recurso não existe no servidor",
        ERR_SERVER_ERROR: "Erro de processamento no servidor",
        ERR_CONNECTION_REFUSED: "Sem conexão com o servidor",

    };

    return (
        errorCode[code]
            ? errorCode[code]
            : "Não foi possível processar a requisição"
    )
};

ShowError.propTypes = {
  code: P.string,
}


