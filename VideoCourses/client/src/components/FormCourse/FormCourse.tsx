import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import './FormCourse.scss';

interface InterfaceAuthor {
    id: number,
    lastName: string
}

interface InterfaceAuthorList {
    from: Array<InterfaceAuthor>,
    to: Array<InterfaceAuthor>
}

interface InterfaceSelectState {
    valueFrom: string,
    valueTo: string
}

interface OwnProps {
    authorList: InterfaceAuthorList,
    changeAuthorList: Function,
    handleReplaceForward: any,
    handleReplaceBack: any,
    selectState: InterfaceSelectState,
    changeSelectState: Function,
    handleChangeSelectStateFrom: any,
    handleChangeSelectStateTo: any,
}

const from: Array<InterfaceAuthor> = [{
        id: 1,
        lastName: 'Иванов'
    },
    {
        id: 1,
        lastName: 'Петров'
    },
    {
        id: 1,
        lastName: 'Сидоров',
    }];
const to: Array<InterfaceAuthor> = [{
        id: 4,
        lastName: 'Лермонтов'
    },
    {
        id: 5,
        lastName: 'Петров'
    }];

const handlers = {
    handleChangeSelectStateFrom: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeSelectState, selectState } = props;
        changeSelectState({...selectState, valueFrom: event.currentTarget.value});

    },
    handleChangeSelectStateTo: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeSelectState, selectState } = props;
        changeSelectState({...selectState, valueTo: event.currentTarget.value});
    },
    handleReplaceForward: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeAuthorList, authorList, selectState, changeSelectState } = props;
        if(selectState.valueFrom) {
            const indexDeleteFrom = authorList.from.findIndex(el => el.lastName === selectState.valueFrom );
            const arrFrom = [...authorList.from ];
                let arrTo = [ ...authorList.to ];
                arrTo = arrTo.concat(arrFrom[indexDeleteFrom]);
                arrFrom.splice(indexDeleteFrom, 1);
            changeAuthorList({ from: arrFrom, to: arrTo });
            changeSelectState({...selectState, valueFrom: ""});
        }
    },

    handleReplaceBack: (props: OwnProps) => (event: React.FormEvent<HTMLSelectElement>) => {
        const { changeAuthorList, authorList, selectState, changeSelectState } = props;
        if(selectState.valueTo) {
            const indexDeleteFrom = authorList.to.findIndex(el => el.lastName === selectState.valueTo );
            const arrFrom = [...authorList.to ];
                let arrTo = [ ...authorList.from ];
                arrTo = arrTo.concat(arrFrom[indexDeleteFrom]);
                arrFrom.splice(indexDeleteFrom, 1);
            changeAuthorList({ from: arrTo, to: arrFrom });
            changeSelectState({...selectState, valueTo: ""});
        }

    }
} 

const FormCourse: React.SFC<OwnProps> = (props) => {
    const { authorList,
        handleReplaceForward,
        handleReplaceBack,
        selectState,
        handleChangeSelectStateFrom,
        handleChangeSelectStateTo } = props;
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
                    <select value={selectState.valueFrom} onChange={handleChangeSelectStateFrom} size={6}>
                    <option value="" disabled>None</option>
                    {
                        authorList.from.map(author => (<option
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
                        authorList.to.map(author => (<option
                            key={author.id + author.lastName} 
                            id={author.id + author.lastName} 
                            value={author.lastName}>{author.lastName}</option>))
                    }
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

export default compose<OwnProps, {}>(
    withState('authorList', 'changeAuthorList', { from, to}),
    withState('selectState', 'changeSelectState', { valueFrom: '', valueTo: ''}),
    withHandlers(handlers)
)(FormCourse);