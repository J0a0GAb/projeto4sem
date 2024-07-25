import React, { useState } from "react";
import P from 'prop-types';

const SearchDataByName = ({ onChangeNome }) => {
  const [nome, setNome] = useState("");

  const onChangeNomeTyped = (e) => {
    setNome(e.target.value);
    onChangeNome(e);
  };

  return (
    <div>
      <form>
        <div className="row">
          <label className="col-form-label col-12 col-sm-1">Nome:</label>
          <div className="col-9 col-sm-9 col-md-9 offset-md-1">
            <input
              type="text"
              id="search"
              value={nome}
              className="form-control"
              placeholder="Digite o nome do autor para pesquisa"
              onChange={(e) => onChangeNomeTyped(e)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};


SearchDataByName.propTypes = {
  onChangeNome:P.func.isRequired,
}

export default SearchDataByName;
