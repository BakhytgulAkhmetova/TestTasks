import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import './Layout.scss';
import logo from '../../assert/logo.svg';

interface InterfaceLayoutHeader {
    Content: any,
    HeaderParticular?: any,
    path: string,
    contentStyle: string,
    propsHeader?: any,
    propsContent?: any
}

const Layout = ( props: InterfaceLayoutHeader) => {
let { Content, HeaderParticular,
   path, contentStyle, propsHeader, propsContent } = props;
  return (
    <Route path={path}
          render={() => localStorage.getItem('token') || path ==='/login'?
       (
      <div className="layout">
        <div className="layout__header">
        <div className="layout__header--logo-wrap">
            <img src={logo}
                className="layout__header--logo"
                alt="logo" />
        </div>
        <h1 className="layout__header--caption">Videocourses</h1>
        {
              HeaderParticular?
              <HeaderParticular 
              propsHeader = {propsHeader}
              headerStyle='layout__header-particular'/>: null
        }
        </div>
          <Content propsContent={propsContent}
                  contentStyle={contentStyle} />
        <div className="layout__footer">
         <h2 className='layout__footer-caption'>Copyright 2019</h2>
        </div>
      </div>
    ): (
      (
        <Redirect
          to={{
          pathname: '/login'
          }}/>)
    ) } />
  ) 
};

export default Layout;
