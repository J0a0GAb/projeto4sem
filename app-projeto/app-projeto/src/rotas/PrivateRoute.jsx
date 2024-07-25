import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/layouts/Layout';
import useLogin from '../hooks/useLogin';


const PrivateRoute = () => {
    let { getUsuarioLogado } = useLogin();
    return(
        getUsuarioLogado() ? (
           <Layout>
              <Outlet/>
            </Layout>
        )
        :(
          <Navigate to="/login"/>
        )

    )
}

export default PrivateRoute;

