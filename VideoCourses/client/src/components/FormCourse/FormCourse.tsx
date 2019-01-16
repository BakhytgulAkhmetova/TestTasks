import React from 'react';

import './FormCourse.scss';

interface OwnProps {

}

export const FormCourse: React.SFC<OwnProps> = (props) => {

    return(
        <form className='form-course'>  
            <div className='form-course__name'>
               <label htmlFor='name'>Название:</label>
               <input className='name__input' id='name' type='text'/>
            </div> 
            <div className='form-course__description'>
                <label htmlFor='description'>Описание:</label>
                <textarea className='description__input' id='description'></textarea>
            </div>
            <div className='form-course__date'>
               <label htmlFor='date'>Дата:</label>
               <input className='date__input' id='date' type='text'/>
            </div> 
            <div className='form-course__duration'>
                <label htmlFor='duration'>Продолжительность:</label>
                <input className='duration__input' id='duration' type='text'/>
            </div>
            <div className='form-course__author-list'>
                <label htmlFor='author-list'>Список авторов:</label>
                <div className='author-list__box'>
                    <select multiple size={6}>
                        <option value="Иванов">Иванов</option>
                        <option value="Петров">Петров</option>
                        <option value="Сидоров">Сидоров</option>
                    </select>
                </div>
                <div className='author-list__button-group'>
                    <button type='button'>&#x25B6;</button>
                    <button type='button'>&#x25C0;</button>
                </div>
                <div className='author-list__box'>
                    <select size={6}>
                        <option value="Лермонтов">Лермонтов</option>
                        <option value="Петров">Петров</option>
                    </select>
                </div>
            </div>
            <div className='form-course__button-group'>
               <button type='button'>Сохранить</button>             
               <button type='button'>Отмена</button>      
            </div>
        </form>
    );
}
