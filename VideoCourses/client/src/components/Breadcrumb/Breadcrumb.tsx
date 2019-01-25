import React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumb.scss';

interface OwnProps {
    pathList: Array<{
        path: string,
        name: string
    }>
}

export const  Breadcrumb: React.SFC<OwnProps> = (props) => {
    const { pathList } = props;
    const lastIndex = pathList.length - 1;
    const lastItem = pathList[lastIndex];
    return(
        <ul className ='breadcrumb'>
        {
            pathList.map((p, index) => {
               return index!==pathList.length - 1?
                <li key={index}><Link to={p.path}>{p.name}</Link></li>
                : <li key={lastIndex}>{lastItem.name}</li> ;
            })
        }    
        </ul>
    );
}
