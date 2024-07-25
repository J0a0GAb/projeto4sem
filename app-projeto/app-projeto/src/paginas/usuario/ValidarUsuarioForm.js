import { useState } from "react";

const useValidarFormUsuario = (USUARIO, ERRORS) => {

    const [usuario, setUsuario] = useState(USUARIO);
    const [errors, setErrors] = useState(ERRORS);

    const isValid = (erros) => {
        let keys = Object.keys(erros)
        let count = keys.reduce((acc, curr) => erros[curr] ? acc + 1 : acc, 0)
        return count === 0;
    }

    const validateAll = () => {
        let {username, email, password, confirmePassword} = usuario;
        let erros = {}
        erros.username = validateUserName(username)
        erros.email = validateEmail(email)
        erros.password = validatePassword(password)
        erros.confirmePassword = validateConfirme(password, confirmePassword)
        return erros;
    }

    const validBlurInput = (field) => {
        let {username, email, password, confirmePassword} = usuario;
        let erros = errors;
        switch(field) {
            case "username":
                erros.username = validateUserName(username)
                break;
            case "email":
                erros.email = validateEmail(email)
                break;
            case "password":
                erros.password = validatePassword(password)
                break;
            case "confirmePassword":
                erros.confirmePassword = validateConfirme(password, confirmePassword)
                break;
            default:
                break;
        }
        return erros;
    }

    const isFormValid = () => {
        let erros = validateAll()
        return isValid(erros)
    }

    const validateUserName = (username) => {
        return !username ? "Informe o nome do usuário" : username.length < 5 ? "O nome deve ser informado com mais de 5 caracteres" : ""
    }

    const validateEmail = (email) => {
        return !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email) ? "E-mail inválido " : ""
    }

    const validatePassword = (password) => {
        return !password ? "A senha deve ser informada " : password.length < 6 ? "A senha deve conter pelo menos seis caracteres " : ""
    }

    const validateConfirme = (password, confirmePassword) => {
        return !confirmePassword ? "A senha deve ser informada corretamente" : confirmePassword !== password ? "As senhas deve ser iguais " : ""
    }

    const validarUsuarioFromServer = ( fields ) => {
        if (fields === undefined) {
            return;
        }
        let erros = errors;
        for (let i = 0; i < fields.length; i++){
            if (fields[i].nome === 'username') {
                erros.username = fields[i].userMessage;
            }
            if (fields[i].email === 'email') {
                erros.email = fields[i].userMessage;
            }
            if (fields[i].nome === 'password') {
                erros.password = fields[i].userMessage;
            }
            if (fields[i].nome === 'confirmePassword') {
                erros.confirmePassword = fields[i].userMessage;
            }
        }
        return erros;
    }


    return {
        usuario,
        setUsuario,
        errors,
        setErrors,
        isValid,
        validateAll,
        validBlurInput,
        isFormValid,
        validarUsuarioFromServer
    }
}

export default useValidarFormUsuario;
