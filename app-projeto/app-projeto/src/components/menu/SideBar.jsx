import React, { Fragment } from 'react';
import items from './SideBarData';
import ShowItem from './ShowItem';
import P from 'prop-types';


const SideBar = ({ sideBar }) => {
  return (
    <Fragment>
       <div className={sideBar ? "app-sidebar" : "app-sidebar  active"}>
        {
          items.map((item, index) => {
            return (
               <ShowItem
                   key={index}
                   item={item}
               />
            )
          })
        }
      </div>
    </Fragment>
  )
}


SideBar.propTypes = {
  sideBar: P.bool.isRequired,
}
export default SideBar
