import { useContext } from "react";
import { LoginContexto } from "../contexto/LoginContext";


const useLogin = () => {
  const context = useContext(LoginContexto);
  return context;
}

export default useLogin;
