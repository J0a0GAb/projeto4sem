
import http from '../config/http';

export const postFoto = async (formData) => {
    return(http({
        method: 'post',
        url: '/foto/salvar',
        data: formData,
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }).then((response) => {
        return response?.data;
    }))
}


export const deleteFoto = async (fotoCadastrada) => {
    return (http({
        method: 'delete',
        url: '/foto/excluir',
        data: fotoCadastrada,
        headers : {
            'Content-type': 'multipart/form-data'
        }
    }).then((response) => {
        return response?.data;
    }))
}
