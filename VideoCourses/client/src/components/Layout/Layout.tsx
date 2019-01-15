import React from 'react';
import { Route } from 'react-router-dom';

import './Layout.scss';
import logo from '../../images/logo.svg';

const Layout = ( props: { Component: any, path: string, contentStyle: string }) => {
  let { Component, path, contentStyle } = props;
  return (
    <Route path={path} render={matchProps => (
      <div className="layout">
        <div className="layout__header">
        <div className="layout__header--logo-wrap">
            <img src={logo} className="layout__header--logo" alt="logo" />
        </div>

        <h1 className="layout__header--caption">Videocourses</h1>
        </div>
          <Component contentStyle={contentStyle} {...matchProps} />
        <div className="layout__footer">
         <h2 className='layout__footer-caption'>2014 Copyright</h2>
        </div>
      </div>
    )} />
  )
};

export default Layout;
