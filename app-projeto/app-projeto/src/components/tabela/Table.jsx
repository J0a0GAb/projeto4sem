import P from 'prop-types';
import React, { Fragment } from 'react';
import Pagination from '../pagination/Pagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ header,
                 onSorting,
                 linha,
                 path,
                 page,
                 pageSize,
                 totalPages,
                 totalElements,
                 changePage}) => {
  return (
    <Fragment>
       <div id="no_more_table">
        <table id="tabela" className="app-tabela table table-striped table-bordered table-hover cf">
         <TableHeader header={header} onSorting={onSorting}/>
         <TableBody linha={linha} path={path}/>
        </table>
        {linha && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            totalElements={totalElements}
            changePage={(pagina) => changePage(pagina)}
          />
        )}
      </div>
    </Fragment>
  )
}

Table.propTypes ={
  header:P.array.isRequired,
  onSorting:P.func.isRequired,
  linha:P.array.isRequired,
  path:P.string.isRequired,
  page:P.number.isRequired,
  pageSize:P.number.isRequired,
  totalPages:P.number.isRequired,
  totalElements:P.number.isRequired,
  changePage:P.func.isRequired
}

export default Table;
