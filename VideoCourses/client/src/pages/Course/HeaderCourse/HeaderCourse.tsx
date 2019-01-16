import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import './HeaderCourse.scss';

interface OwnProps {
    propsHeader: any,
    headerStyle: string
}

export const  HeaderCourse: React.SFC<OwnProps> = (props) => {
    const { propsHeader, headerStyle } = props;
    const headerClass = classnames('header-course', headerStyle);
    return(
        <div className={headerClass}>
            <button className='header-course__button'>Курсы</button>
            <div className='header-course__user-options'>
                <span>{propsHeader.login}</span>
                <Link onClick={propsHeader.handleLogOff} className='user-options__link' to='/'>logOff</Link>
            </div>
        </div>
    );
}
