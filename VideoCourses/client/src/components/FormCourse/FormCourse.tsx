import React from 'react';

import './FormCourse.scss';

interface OwnProps {

}

export const FormCourse: React.SFC<OwnProps> = (props) => {

    return(
        <form className='form-course'>  
            <div className='form-course__name'>
               <label htmlFor='name'>Название:</label>
               <input id='name' type='text'/>
            </div> 
            <div className='form-course__description'>
                <label htmlFor='description'>Описание:</label>
                <input id='description' type='text'/>
            </div>
            <div className='form-course__date'>
               <label htmlFor='date'>Дата:</label>
               <input id='date' type='text'/>
            </div> 
            <div className='form-course__duration'>
                <label htmlFor='duration'>Продолжительность:</label>
                <input id='duration' type='text'/>
            </div>
            <div className='form-course__author-list'>
                <label htmlFor='author-list'>Список авторов:</label>
                <div className='author-list__box-from'>
                    <select size={6}>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div className='author-list__box-from'>
                    <button>></button>
                    <button>dfdf</button>
                </div>
                <div>
                    <select>

                    </select>
                </div>
            </div>
            <div>
               <button type='button' className='form-course__button'>Сохранить</button>             
               <button type='button' className='form-course__button'>Отмена</button>      
            </div>
        </form>
    );
}
