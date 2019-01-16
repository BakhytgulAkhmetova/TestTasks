import React from 'react';
import classnames from 'classnames';

import './ContentCourseNew.scss';

// const course: InterfaceCourse  = {
//     id: 1,
//     name: 'Видеокурс 1',
//     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolorem architecto ut, temporibus quos rem suscipit aut qui corrupti.',
//     duration: 43,
//     date: 16
// }

export const ContentCourseAdd = (props: {contentStyle: string}) => {
    const {contentStyle } = props;
    const contentClass = classnames('content-course-new', contentStyle);
    return(
        <div className={contentClass}>

        </div>
    );
};
