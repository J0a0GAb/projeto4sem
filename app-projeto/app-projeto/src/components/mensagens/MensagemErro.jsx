import P from 'prop-types';
import React, { Fragment } from "react";

const MensagemErro = ({ mensagem }) => {
    return (
        <Fragment>
            {
                <div className="invalid-feedback">
                   {
                        <p style={{ margin:"0"}}>
                            <span >{mensagem}</span>
                        </p>
                    }
                </div>
            }
        </Fragment>
    )

}

MensagemErro.propTypes ={
  mensagem: P.string.isRequired,
}

export default MensagemErro;
