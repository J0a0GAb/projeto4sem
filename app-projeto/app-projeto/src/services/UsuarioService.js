import http from '../config/http';


const listagemUsuarios = async (page, pageSize, dir, props) => {
    return (
        http({
            method:'GET',
            url: '/usuario/listaPaginada',
            params : {
                page,
                pageSize,
                dir,
                props
            },
        }).then(response => {
           return response;
        }))
}


const listagemUsuariosPorNome = async (key, page, pageSize, dir, props) => {
    return (
        http({
            method: 'GET',
            url : '/usuario/listaPaginadaPorNome',
            params: {
                key,
                page,
                pageSize,
                dir,
                props
            },
        }).then((response) => {
            return response
        }))
}


const lerUsuarioPorId = async ( id ) => {
    return(
        http({
            method: 'get',
            url: `/usuario/buscar/${id}`
        }).then((response)=>{
            return response;
        }))
}

const incluirUsuario = async (usuario) => {
    return (
        http({
            method: 'post',
            url : '/usuario/salvar',
            data:usuario
     }).then((response)=>{
        return response;
    }))
}

const alterarUsuario = async (id, usuario ) => {
    return(
        http({
            method:'put',
            url:`/usuario/alterar/${id}`,
            data:usuario
        }).then((response)=>{
            return response;
        }))
}

const excluirUsuario = async (id) =>{
    return (
        http({
            method:'delete',
            url:`/usuario/excluir/${id}`
        }).then((response)=>{
            return response;
        }))
}

const alterarStatusUsuario = async (id, status) => {
    let usuario = {
        id,
        status
    }
    return (
        http({
            method: 'patch',
            url: "/usuario/status",
            data: usuario
        }).then((response) => {
            return response;
        }))
}

const gerarRelatorioPdf = async () => {
    return (
        http({
            method: 'GET',
            url: '/usuario/pdf',
            responseType: 'blob'
        }).then(response => {
            const file = new Blob([response.data]);
            const url = window.URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
    }))
}

const getRelatorioPdfFromApi = () => {
    return (
        http({
           method: 'GET',
           url: '/usuario/relatorio',
           responseType: 'blob'
        }).then((response) => {
            const file = new Blob(
                [
                  response.data
                ],{
                    type: 'application/pdf'
                });
            const fileURL = URL.createObjectURL(file);
            return fileURL;
        }))
}


const lerUsuarioRolesPorId = async (id) => {
    return (
        http({
            method: 'get',
            url: `/usuario/roles/${id}`
        }).then((response) => {
        return response;
        }))
    }

const adicionarUsuarioRoles = async (usuario) => {
    return (
        http({
            method: 'post',
            url: '/usuario/adicionar',
            data: usuario
        }).then((response) => {
            return response;
        })
    )
}



export {
    listagemUsuarios,
    listagemUsuariosPorNome,
    lerUsuarioPorId,
    incluirUsuario,
    alterarUsuario,
    excluirUsuario,
    alterarStatusUsuario,
    gerarRelatorioPdf,
    getRelatorioPdfFromApi,
    lerUsuarioRolesPorId,
    adicionarUsuarioRoles


}

