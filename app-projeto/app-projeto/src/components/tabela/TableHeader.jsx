import P from 'prop-types';
import React, { Fragment, useState } from 'react';
import * as FaIcons from "react-icons/fa";
import './tabela.css';

const TableHeader = ({header, onSorting}) => {

  const [props, setProps] = useState("");
  const [dir, setDir] = useState("");


  const getCaps = (headerLine) => {
    if (headerLine) return headerLine.toUpperCase();

  };

  const onSortingField = (e, atributo) => {
     e.preventDefault();
     const direcao = dir && dir  === "asc" ? "desc" : "asc";
     setProps(atributo);
     setDir(direcao);
     onSorting(props, direcao);
  }
  return (
    <Fragment>
    <thead className="cf">
        <tr className="p-3 mb-2 bg-primary text-white">
            { header.map(( linha, index ) => (
                <th key={index} className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label">
                <button className="btn btn-link text-white app-text-underline app-label" onClick={(e) => linha.sort ? onSortingField(e, linha.field):''}>
                    {getCaps(linha.nome)}
                    { props && props === linha.field  && (
                        <i className={ dir === "asc" ? (
                          <FaIcons.FaSortUp />
                        ) : (
                          <FaIcons.FaSortDown />
                        ) }></i>
                    )}
                </button>
                </th>
            ))}
            <th className="app-cabecalho-tabela p-3 mb-2 bg-success text-white app-label" >Ações</th>
        </tr>
    </thead>
</Fragment>
  )
}

TableHeader.propTypes ={
  header:P.array.isRequired,
  onSorting:P.func.isRequired,
}

export default TableHeader;
