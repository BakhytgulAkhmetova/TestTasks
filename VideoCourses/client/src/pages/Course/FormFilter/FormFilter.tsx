import React, { FormEvent } from 'react';
import classnames from 'classnames';
import { compose, withHandlers  } from 'recompose';

import './FormFilter.scss';

interface OwnProps {
    filterSizeStyle: string,
    inputFilter: string,
    changeInputFilter: Function,
    handleChangeInput: (e: React.FormEvent)=> void,
    handleOnSearch: (e: React.MouseEvent | React.FormEvent )=> void
}
interface AnotherProps {
    filterSizeStyle: string,
    inputFilter: string,
    changeInputFilter: Function,
    handleOnSearch: (e: React.MouseEvent | React.FormEvent )=> void
}

const handlers = {
    handleChangeInput: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement> ) => {
        const { changeInputFilter } = props;
        changeInputFilter(event.currentTarget.value);
    }
}

const FormFilter: React.SFC<OwnProps> = (props) => {
    const { filterSizeStyle, inputFilter, handleChangeInput, handleOnSearch } = props;
    const filterClass = classnames('filter-courses', filterSizeStyle);

    return(
        <form  className={ filterClass}>  
               <input onChange={handleChangeInput}
                    value={inputFilter} 
                    className='filter-courses__input' 
                    type='text' 
                    placeholder='фрагмент имени или дата'/>
               <button 
                    type='submit'
                    onSubmit={handleOnSearch}
                    onClick={handleOnSearch}
                    className='form-filter__button'>Найти</button>
        </form>
    );
}

export default compose<OwnProps, AnotherProps>(
    withHandlers(handlers))
(FormFilter);
