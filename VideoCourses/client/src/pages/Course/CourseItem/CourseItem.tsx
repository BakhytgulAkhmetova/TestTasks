import React from 'react';
import classnames from 'classnames';

import { InterfaceCourse } from '../../../interfaces';

import './CourseItem.scss';

interface OwnProps {
    course: InterfaceCourse,
    courseItemStyle: string
}

export const CourseItem: React.SFC<OwnProps> = (props) => {
    const { course, courseItemStyle } = props;
    const courseClass = classnames('course-item', courseItemStyle);
    return(
        <div className={courseClass}>
            <div className='course-item__info'>
            <h2 className='info__name'>{ course.name}</h2>
            <span className='info__duration'> { course.duration} </span>
            <time className='info__date'> Дата: { course.date}</time>
            <p className='info__description'>{ course.description }</p>
            </div>
            <div className='course-item__options'>
               <button className='options__button'>Редактировать</button>
               <button className='options__button'>Удалить</button>
            </div>
        </div>
    );
}
