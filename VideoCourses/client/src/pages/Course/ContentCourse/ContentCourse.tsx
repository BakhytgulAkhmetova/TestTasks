import React from 'react';
import classnames from 'classnames';

import './ContentCourse.scss';

export const ContentCourse = (props: {contentStyle: string}) => {
    const {contentStyle } = props;
    const contentClass = classnames('content-courses', contentStyle);
    return(
        <div className={contentClass}>
        </div>
    );
};
