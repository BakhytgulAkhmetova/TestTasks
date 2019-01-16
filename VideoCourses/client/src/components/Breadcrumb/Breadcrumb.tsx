import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './Breadcrumb.scss';

interface OwnProps {

}

export const  Breadcrumb: React.SFC<OwnProps> = (props) => {
    //const headerClass = classnames('header-course', headerStyle);
    return(
        <ul className ='breadcrumb'>
           <li><a href="#">Home</a></li>
           <li><a href="#">Pictures</a></li>
           <li><a href="#">Summer 15</a></li>
           <li>Italy</li>
        </ul>
    );
}
