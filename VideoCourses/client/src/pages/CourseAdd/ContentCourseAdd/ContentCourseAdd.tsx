import React from 'react';
import classnames from 'classnames';

import {FormCourse} from '../../../components/FormCourse';

import './ContentCourseAdd.scss';

export const ContentCourseAdd = (props: {contentStyle: string}) => {
    const {contentStyle } = props;
    const contentClass = classnames('content-course-new', contentStyle);
    return(
        <div className={contentClass}>
            <FormCourse/>
        </div>
    );
};
