import React from 'react';
import { Route } from 'react-router-dom';

import { InterfaceLayoutHeader } from '../../interfaces';

import './Layout.scss';
import logo from '../../images/logo.svg';

const Layout = ( props: InterfaceLayoutHeader) => {
  let { Content, HeaderParticular, path, contentStyle, propsHeader } = props;
  return (
    <Route path={path} render={() => (
      <div className="layout">
        <div className="layout__header">
        <div className="layout__header--logo-wrap">
            <img src={logo} className="layout__header--logo" alt="logo" />
        </div>
        <h1 className="layout__header--caption">Videocourses</h1>
        {
              HeaderParticular?
              <HeaderParticular  
              propsHeader = {propsHeader}
              headerStyle='layout__header-particular'/>: null
        }
        </div>
          <Content contentStyle={contentStyle} />
        <div className="layout__footer">
         <h2 className='layout__footer-caption'>2014 Copyright</h2>
        </div>
      </div>
    )} />
  )
};

export default Layout;
