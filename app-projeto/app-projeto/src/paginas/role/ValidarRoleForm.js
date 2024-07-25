import { useState } from "react";

const useValidarFormRole = (ROLE, ERRORS) => {

    const [role, setRole] = useState(ROLE);
    const [errors, setErrors] = useState(ERRORS);
   
    const isValid = (erros) => {
        let keys = Object.keys(erros)
        let count = keys.reduce((acc, curr) => erros[curr] ? acc + 1 : acc, 0)
        return count === 0;
    }
    
    const validateAll = () => {
        let {nome, sigla} = role;
        let erros = {}
        erros.nome = validateRoleName(nome);
        erros.sigla = validateRoleName(sigla);
        return erros;
    }

    const validBlurInput = (field) => {
        let {nome, sigla} = role;
        let erros = errors;
        switch(field) {
            case "nome":
                erros.nome = validateRoleName(nome)
                break;
            case "sigla":
                erros.sigla = validateRoleSigla(sigla)
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

    const validateRoleName = (nome) => {
        return !nome ? "Informe o nome do direito de acesso " : nome.length < 5 ? "O nome deve ser informado com mais de 5 caracteres" : "";
    }

    const validateRoleSigla = (sigla) => {
        return !sigla ? "A sigla do direito de acesso deve ser informada" : "";
    }


    const validarRoleFromServer = (fields) => {
        let erros = errors;
        
        for (let i = 0; i < fields.length; i++){
            if (fields[i].nome === 'nome') {
               erros.nome = fields[i].userMessage;
            }
            if (fields[i].sigla === 'sigla') {
                erros.sigla = fields[i].userMessage;
            }
        }
        return erros;
    }
    
   
    return {
        role,
        setRole,
        errors,
        setErrors,
        isValid,
        validateAll,
        validBlurInput,
        isFormValid,
        validarRoleFromServer
    }
}

export default useValidarFormRole;