import React, { ChangeEventHandler } from 'react';
import classnames from 'classnames';

import './FormFilter.scss';

interface OwnProps {
    filterSizeStyle: string
}

export const FormFilter: React.SFC<OwnProps> = (props) => {
    const { filterSizeStyle } = props;
    const filterClass = classnames('filter-courses', filterSizeStyle);

    return(
        <form className={ filterClass}>  
               <input className='filter-courses__input' type='text' placeholder='фрагмент имени или дата'/>
            <button type='button' className='form-filter__button'>Найти</button>
        </form>
    );
}
