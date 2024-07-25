import http from '../config/http';


const listagemRoles = async(page, pageSize, dir, props) => {
    return (
        http({
            method: 'GET',
            url: '/role/listaPaginada',
            params: {
                page,
                pageSize,
                dir,
                props
            },
        }).then(response => {
            return response;
        }))
}

const listagemRolesPorNome = async(key, page, pageSize, dir, props) => {
    return (
        http({
            method: 'GET',
            url: '/role/listaPaginadaComNome',
            params: {
                key,
                page,
                pageSize,
                dir,
                props
            },
        }).then((response) => {
            return response;
        }))
}


const lerRolePorId = async(id) => {
    return (
        http({
            method: 'get',
            url: `/role/buscar/${id}`
        }).then((response) => {
            return response;
        }))
}

const incluirRole = async(role) => {
    return (
        http({
            method: 'post',
            url: '/role/salvar',
            data: role
        }).then((response) => {
            return response;
        }))
}

const alterarRole = async(id, role) => {
    return (
        http({
            method: 'put',
            url: `/role/alterar/${id}`,
            data: role
        }).then((response) => {
            return response;
        }))
}

const excluirRole = async(id) => {
    return (
        http({
            method: 'delete',
            url: `/role/excluir/${id}`
        }).then((response) => {
            return response;
        }))
}

export {
    listagemRoles,
    listagemRolesPorNome,
    lerRolePorId,
    incluirRole,
    alterarRole,
    excluirRole
}
