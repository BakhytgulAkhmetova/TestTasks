import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { InterfaceCourse } from '../../../interfaces';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';
import { getCourseList } from '../../../store/course/asyncActions';

import './ContentCourse.scss';

interface OwnProps {
    contentStyle: string,
    courseList: Array<InterfaceCourse>,
    getCourseList: Function,
    history: any
}

interface StateProps {
    courseList: Array<InterfaceCourse>
}

interface DispatchProps {
    getCourseList: () => void
}

const mapStateToProps = (state: any): StateProps => ({
    courseList: state.course.courseList
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    getCourseList: () => {
        dispatch(getCourseList());
    }
});

const ContentCourse: React.SFC<OwnProps> = (props) => {
    const { contentStyle, courseList, history } = props;
    const contentClass = classnames('content-courses', contentStyle);
    return(
        <div className={contentClass}>
            <div className='courses__options'>
                <FormFilter filterSizeStyle='content-courses__filter'/>
                <button className='content-courses__button' onClick={ () => (history.push('/courses/new') ) } >Добавить курс</button>
            </div>
            <div className='courses__list'>
            {
                courseList.map(course => (
                    <CourseItem 
                    key={course.id + course.name}
                    courseItemStyle='content-courses__course-item'
                    course = {course}/>

                ))
            }
            </div>
        </div>
    );
};

export default compose< OwnProps, {}>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle<OwnProps, {}> ({
        componentDidMount() {
            const { getCourseList } = this.props;
            getCourseList();
        }
    })
)(ContentCourse);
