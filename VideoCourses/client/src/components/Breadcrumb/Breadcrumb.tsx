import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumb.scss';

interface OwnProps {
    pathList: Array<string>
}

export const  Breadcrumb: React.SFC<OwnProps> = (props) => {
    const { pathList } = props;
    return(
        <ul className ='breadcrumb'>
        {
            pathList.map((p, index) => {
               return index!==pathList.length - 1?
                <li key={p + index}><Link to='/courses'>{p}</Link></li>: null;
            })
        }    
        <li>{pathList[pathList.length - 1]}</li>    
        </ul>
    );
}
