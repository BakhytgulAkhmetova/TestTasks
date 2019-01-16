import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { Breadcrumb } from '../Breadcrumb';

import './HeaderPrivate.scss';

interface OwnProps {
    propsHeader: any,
    headerStyle: string
}

export const  HeaderPrivate: React.SFC<OwnProps> = (props) => {
    const { propsHeader, headerStyle } = props;
    const headerClass = classnames('header-course', headerStyle);
    return(
        <div className={headerClass}>
            <Breadcrumb/>
            <div className='header-course__user-options'>
                <span>{propsHeader.login}</span>
                <Link onClick={propsHeader.handleLogOff} className='user-options__link' to='/'>logOff</Link>
            </div>
        </div>
    );
}
