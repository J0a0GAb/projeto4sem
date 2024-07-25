import P from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const TableBody = ({ linha, path }) => {
  const colunas = Object.keys(linha);
  return (
    <tr key={linha.Id} className='app-coluna-detalhe-centro app-label'>
      {
       colunas.map((coluna, indice) =>
               <td key={indice}
                   data-label={linha[coluna]}
                  >
                   {linha[coluna]}
               </td>
       )
      }
      <td style={{textAlign:"center"}} data-title="Ações">
        <Link
          className="btn btn-info btn-sm"
          title="Alterar Registro "
          to={`${path}/alterar/${linha.Id}`}
        >
          <i className="fa fa-pencil"></i>
        </Link>
        <Link
          className="btn btn-danger btn-sm"
          title="Excluir Registro "
          to={`${path}/excluir/${linha.Id}`}
        >
          <i className="fa fa-trash"></i>
        </Link>
        <Link
          className="btn btn-secondary btn-sm"
          title="Consultar Registro "
          to={`${path}/consultar/${linha.Id}`}
        >
          <i className="fa fa-search-minus"></i>
        </Link>
      </td>
    </tr>
  );

}


TableBody.propTypes ={
  linha:P.array.isRequired,
  path:P.string.isRequired,
}

export default TableBody
