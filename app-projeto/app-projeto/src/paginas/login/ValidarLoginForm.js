import { useState } from "react";

const useValidarLogin = (LOGIN, ERRORS) => {

    const [login, setLogin] = useState(LOGIN);
    const [errors, setErrors] = useState(ERRORS);

    const onChangeLogin = (e) => {
      const { name, value } = e.target;
      setLogin({
        ...login,
        [name]: value,
      });
    };

    const isValid = (erros) => {
        let keys = Object.keys(erros)
        let count = keys.reduce((acc, curr) => erros[curr] ? acc + 1 : acc, 0)
        return count === 0;
    }

    const validateAll = () => {
        let { email, password } = login;
        let erros = {}
        erros.email = validateEmail(email)
        erros.password = validatePassword(password)
        return erros;
    }

    const validBlurInput = (field) => {
        let { email, password } = login;
        let erros = errors;
        switch(field) {
            case "email":
                erros.email = validateEmail(email)
                break;
            case "password":
                erros.password = validatePassword(password)
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

    const validateEmail = (email) => {
        return !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email) ? "E-mail inválido " : ""
    }

    const validatePassword = (password) => {
        return !password ? "A senha deve ser informada " : password.length < 6 ? "A senha deve conter pelo menos seis caracteres " : ""
    }

    const validarLoginFromServer = ( fields ) => {
        if (fields === undefined) {
            return;
        }
        let erros = errors;
        for (let i = 0; i < fields.length; i++){
            if (fields[i].email === 'email') {
                erros.email = fields[i].userMessage;
            }
            if (fields[i].nome === 'password') {
                erros.password = fields[i].userMessage;
            }
        }
        return erros;
    }


    return {
        login,
        setLogin,
        errors,
        setErrors,
        onChangeLogin,
        isValid,
        validateAll,
        validBlurInput,
        isFormValid,
        validarLoginFromServer
    }
}

export default useValidarLogin;
