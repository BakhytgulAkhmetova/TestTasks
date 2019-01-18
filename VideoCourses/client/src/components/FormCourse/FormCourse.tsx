import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import { InterfaceCourse } from '../../interfaces';
import { filterDuration } from '../../utils';

import './FormCourse.scss';

interface InterfaceSelectState {
    valueFrom: string,
    valueTo: string
}

interface OwnProps {
    changeAuthorList: Function,
    handleReplaceForward: any,
    handleReplaceBack: any,
    handleSaveCourse: any,
    handleCancel: any
    courseForm: InterfaceCourse,
    handleChangeCourseForm: any
    selectState: InterfaceSelectState,
    changeSelectState: Function,
    changeCourseForm: Function,
    handleChangeSelectStateFrom: any,
    handleChangeSelectStateTo: any,
}

interface AnotherProps {
    courseForm: InterfaceCourse,
    changeCourseForm: Function,
    handleChangeCourseForm: any,
    handleSaveCourse: any,
    handleCancel: any
}

const handlers = {
    handleChangeSelectStateFrom: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeSelectState, selectState } = props;
        changeSelectState({...selectState, valueFrom: event.currentTarget.value});

    },

    handleChangeSelectStateTo: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeSelectState, selectState } = props;
        changeSelectState({...selectState, valueTo: event.currentTarget.value});
    },

    handleReplaceForward: (props: OwnProps) => () => {
        const {  changeCourseForm, selectState, changeSelectState, courseForm } = props;
        if(selectState.valueFrom) {
            const indexDeleteFrom = courseForm.authorList.from.findIndex(el => el.lastName === selectState.valueFrom );
            const arrFrom = [...courseForm.authorList.from ];
                let arrTo = [ ...courseForm.authorList.to ];
                arrTo = arrTo.concat(arrFrom[indexDeleteFrom]);
                arrFrom.splice(indexDeleteFrom, 1);
            changeCourseForm({ ...courseForm, authorList: { from: arrFrom, to: arrTo }});
            changeSelectState({...selectState, valueFrom: ""});
        }
    },

    handleReplaceBack: (props: OwnProps) => () => {
        const { changeCourseForm, selectState, changeSelectState, courseForm } = props;
        if(selectState.valueTo) {
            const indexDeleteFrom = courseForm.authorList.to.findIndex(el => el.lastName === selectState.valueTo );
            const arrFrom = [...courseForm.authorList.to ];
                let arrTo = [ ...courseForm.authorList.from ];
                arrTo = arrTo.concat(arrFrom[indexDeleteFrom]);
                arrFrom.splice(indexDeleteFrom, 1);
            changeCourseForm({ ...courseForm, authorList: { from: arrTo, to: arrFrom }});
            changeSelectState({...selectState, valueTo: ""});
        }

    }
} 

const FormCourse: React.SFC<OwnProps> = (props) => {
    const { 
        handleReplaceForward,
        handleReplaceBack,
        handleCancel,
        handleSaveCourse,
        courseForm,
        selectState,
        handleChangeCourseForm,
        handleChangeSelectStateFrom,
        handleChangeSelectStateTo } = props;
    const duration = filterDuration(parseInt(courseForm.duration));
    return(
        <form className='form-course'>  
            <div className='form-course__name'>
               <label htmlFor='name'>Название:</label>
               <input 
               className='name__input'
                id='name'
                onChange={handleChangeCourseForm}
                value={courseForm.name} 
                type='text'/>
            </div> 
            <div className='form-course__description'>
                <label htmlFor='description'>Описание:</label>
                <textarea 
                className='description__input'
                value={courseForm.description}
                onChange={handleChangeCourseForm}
                id='description'></textarea>
            </div>
            <div className='form-course__date'>
               <label htmlFor='date'>Дата:</label>
               <input 
                type="date"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                className='date__input'
                id='date'
                onChange={handleChangeCourseForm}
                value={courseForm.date}/>
            </div> 
            <div className='form-course__duration'>
                <label htmlFor='duration'>Продолжительность:</label>
                <input 
                className='duration__input'
                id='duration'
                onChange={handleChangeCourseForm}
                value={courseForm.duration}
                type='text'/>
                {
                    courseForm.duration?
                    <span> {duration.hours} ч {duration.min} мин</span>: null
                }
                
            </div>
            <div className='form-course__author-list'>
                <label htmlFor='author-list'>Список авторов:</label>
                <div className='author-list__box'>
                    <select value={selectState.valueFrom} onChange={handleChangeSelectStateFrom} size={6}>
                    <option value="" disabled>None</option>
                    {
                            courseForm.authorList.from.map(author => (<option
                            key={author.id + author.lastName} 
                            id={author.id + author.lastName} 
                            value={author.lastName}>{author.lastName}</option>))
                    }
                    </select>
                </div>
                <div className='author-list__button-group'>
                    <button type='button' onClick={handleReplaceForward}>&#x25B6;</button>
                    <button type='button' onClick={handleReplaceBack}>&#x25C0;</button>
                </div>
                <div className='author-list__box'>
                    <select value={selectState.valueTo} onChange={handleChangeSelectStateTo} size={6}>
                    <option value="" disabled>None</option>
                    {
                        courseForm.authorList.to.map(author => (<option
                            key={author.id + author.lastName} 
                            id={author.id + author.lastName} 
                            value={author.lastName}>{author.lastName}</option>))
                    }
                    </select>
                </div>
            </div>
            <div className='form-course__button-group'>
               <button type='button'onClick={handleSaveCourse} >Сохранить</button>             
               <button type='button' onClick={handleCancel} >Отмена</button>      
            </div>
        </form>
    );
}

export default compose<OwnProps, AnotherProps>(
    withState('selectState', 'changeSelectState', { valueFrom: '', valueTo: ''}),
    withHandlers(handlers)
)(FormCourse);
