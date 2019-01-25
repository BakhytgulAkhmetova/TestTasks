import React from 'react';
import classnames from 'classnames';

import { InterfaceCourse } from '../../../interfaces';
import { filterDuration } from '../../../utils/filterDuration';

import './CourseItem.scss';

interface OwnProps {
    course: InterfaceCourse,
    courseItemStyle: string,
    authors: Array<any>,
    handleOpenEditPage: (e: React.MouseEvent) => void,
    handleOpenDeleteModal: (e: React.MouseEvent) => void
}

export const CourseItem: React.SFC<OwnProps> = (props) => {
    const { course, courseItemStyle, authors,
         handleOpenDeleteModal, handleOpenEditPage } = props;
    const courseClass = classnames('course-item', courseItemStyle);
    const duration = filterDuration(course.duration);
    const  authorL = authors.map(a => a.lastName);
    const authorString = authorL.join(',  ');
    return(
        <div className={courseClass}>
            <div className='course-item__info'>
            <h2 className='info__name'>{ course.name}</h2>
            <span className='info__duration'> { duration.hours } ч { duration.min } мин </span>
            <time className='info__date'> Дата: { course.date} </time>
            <p className='info__description'>{ course.description }</p>
            <p className='info__author'> Авторы курса: {authorString}
             </p>
            </div>
            <div className='course-item__options'>
               <button type='button'
                       id={course.id}
                       onClick={handleOpenEditPage}
                       className='options__button'>Редактировать</button>
               <button type='button'
                       id={course.id}
                       onClick={handleOpenDeleteModal}
                       className='options__button'>Удалить</button>
            </div>
        </div>
    );
}
