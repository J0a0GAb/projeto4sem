import classNames from 'classnames';
import P from 'prop-types';
import React from 'react';
import * as FaIcons from "react-icons/fa";


const ItemPage = ({ page, currentPage, icon, onChangePage, isDisabled }) => {
  const classes = classNames({
    "page-item": true,
    active: page === currentPage,
    disabled: isDisabled,
  });
  return (
    <li className={classes} onClick={() => onChangePage(page)}>
        <span className="page-link btn btn-sm" >
            { icon ? <i>{icon}</i> : page }
        </span>
    </li>
  );
};

const intervalPage = (start, end) => {
  return [...Array(end - start).keys()].map((el) => el + start);
}

const getPagesCut = (totalPages, cutTotalPages, currentPage) => {
  let start = 0;
  let end = 0;

  const cuthigher = Math.ceil(cutTotalPages / 2);
  const cutBotton = Math.floor(cutTotalPages / 2);

  if (totalPages < cutTotalPages) {
    start = 1;
    end = totalPages + 1;
  } else if (currentPage >= 1 && currentPage <= cuthigher) {
    start = 1;
    end = cutTotalPages + 1;
  } else if (currentPage + cutBotton >= totalPages) {
    start = totalPages - cutTotalPages + 1;
    end = totalPages + 1;
  } else {
    start = currentPage - cuthigher + 1;
    end = currentPage + cutBotton + 1;
  }
   return {
     start,
     end,
   };
};

const Pagination = ({
  page,
  pageSize,
  totalPages,
  totalElements,
  onChangePage,
}) => {


  let currentPage = page <= totalPages ? page + 1 : 1

  const { start, end } = getPagesCut(totalPages, 5, currentPage);

  const pages = intervalPage(start, end);

  let isFirstPage = currentPage === 1;
  let isLastPage = currentPage === totalPages;

  return (
    <div className="box-footer clear-fix">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-5">
          <div className="pagination">
            <p className="app-label">
              Mostrando&nbsp;&nbsp;
              <span className="badge bg-secondary">{pageSize * page + 1}</span>
              &nbsp;&nbsp; de &nbsp;&nbsp;
              <span className="badge bg-secondary">
                {Math.ceil(totalElements / pageSize)}
              </span>{" "}
              &nbsp;&nbsp; Páginas de &nbsp;&nbsp;
              <span className="badge bg-secondary ">{totalElements} </span>
              &nbsp;&nbsp;Registros Cadastrados.
            </p>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-7">
          <nav aria-label="Page navigation ">
            <ul className="pagination pagination-lg justify-content-end">
              <ItemPage
                 page={page}
                 currentPage={1}
                 icon={<FaIcons.FaAngleLeft/>}
                 onChangePage={()=>onChangePage(1)}
                 isDisabled={isFirstPage}
              />
              <ItemPage
                 page={page}
                 currentPage={page-1}
                 icon={<FaIcons.FaAngleDoubleLeft/>}
                 onChangePage={()=>onChangePage(currentPage-1)}
                 isDisabled={isFirstPage}
              />
              {
                pages.map((pagina)=>(
                  <ItemPage
                     page={pagina}
                     currentPage={currentPage}
                     onChangePage={onChangePage}
                     key={pagina}
                  />
                ))
              }
              <ItemPage
                 page={page}
                 currentPage={currentPage}
                 icon={<FaIcons.FaAngleDoubleRight/>}
                 onChangePage={()=>onChangePage(currentPage+1)}
                 isDisabled={isLastPage}
              />
              <ItemPage
                 page={page}
                 currentPage={totalPages}
                 icon={<FaIcons.FaAngleRight/>}
                 onChangePage={()=>onChangePage(totalPages)}
                 isDisabled={isLastPage}
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page:P.number.isRequired,
  pageSize:P.number.isRequired,
  totalPages:P.number.isRequired,
  totalElements:P.number.isRequired,
  onChangePage:P.func.isRequired
}

ItemPage.propTypes = {
  page:P.number.isRequired,
  currentPage:P.number.isRequired,
  icon:P.elementType,
  isDisabled:P.bool,
  onChangePage:P.func.isRequired,
}

intervalPage.propTypes = {
  start:P.number.isRequired,
  end:P.number.isRequired,
}

getPagesCut.propTypes = {
  pagesCount:P.number.isRequired,
  pagesCutCount:P.number.isRequired,
  currentPage:P.number.isRequired,
}

export default Pagination;
