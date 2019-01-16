import React from 'react';
import classnames from 'classnames';

import { InterfaceCourse } from '../../../interfaces';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';

import './ContentCourse.scss';

const course: InterfaceCourse  = {
    id: 1,
    name: 'Видеокурс 1',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem architecto ut, temporibus quos rem suscipit aut qui corrupti.',
    duration: 43,
    date: 16
}

export const ContentCourse = (props: {contentStyle: string}) => {
    const {contentStyle } = props;
    const contentClass = classnames('content-courses', contentStyle);
    return(
        <div className={contentClass}>
            <div className='courses__options'>
                <FormFilter filterSizeStyle='content-courses__filter'/>
                <button className='content-courses__button'>Добавить курс</button>
            </div>
            <div className='courses__list'>
                <CourseItem 
                courseItemStyle='content-courses__course-item'
                course = {course}/>
            </div>
        </div>
    );
};
