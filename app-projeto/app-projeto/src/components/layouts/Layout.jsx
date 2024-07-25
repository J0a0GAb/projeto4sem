import P from 'prop-types';
import React, { Fragment, useState } from 'react';
import Header from "../header/Header";
import SideBar from "../menu/SideBar";

const Layout = ( { children } ) => {

    const [toggle, setToggle] = useState(true);

    const toogleMenu = () => {
      setToggle(!toggle);
    };


  return (
    <Fragment>
      <Header isToogle={toogleMenu} />
      <SideBar sideBar={toggle} />
      <div className={toggle ? 'app-content ' : 'app-content active'}>{children}</div>
    </Fragment>
  );
}

Layout.propTypes ={
  children: P.node.isRequired,
}

export default Layout
