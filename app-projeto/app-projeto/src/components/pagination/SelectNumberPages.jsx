import P from 'prop-types';
import React, { useState } from "react";

const pagina = [5,10,15,20];

const SelectNumberPage = ({ pageSize, changePageSize }) => {
  const [tamanhoDaPagina, setTamanhoDaPagina] = useState(pageSize);

  const setPagina = (tamanho)=> {
      setTamanhoDaPagina(tamanho);
      changePageSize(tamanho);
  }

  return (
    <div>
        <label className="col-form-label app-label col-sm-2">Show:</label>
        <div className="input-group col-sm-6">
          <select
            className="form-control app-label form-select"
            onChange={(e) => setPagina(e.target.value)}
            value={tamanhoDaPagina}
          >
            {pagina.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <span className="app-label mb-3">&nbsp;&nbsp;&nbsp;&nbsp;Registros</span>
          </div>
        </div>

    </div>
  );
};

SelectNumberPage.propTypes = {
  pageSize:P.number.isRequired,
  changePageSize:P.func.isRequired,
}

export default SelectNumberPage;
