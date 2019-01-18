import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { InterfaceCourse, InterfaceAuthor } from '../../../interfaces';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';
import { getAuthorList } from '../../../store/author/asyncActions';
import { getCourseList } from '../../../store/course/asyncActions';

import './ContentCourse.scss';

interface OwnProps {
    contentStyle: string,
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    getCourseList: Function,
    getAuthors: Function,
    history: any
}

interface StateProps {
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>
}

interface DispatchProps {
    getCourseList: () => void,
    getAuthors: () => void,
}

const mapStateToProps = (state: any): StateProps => ({
    courseList: state.course.courseList,
    authorList: state.author.authorList
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    getCourseList: () => {
        dispatch(getCourseList());
    },
    getAuthors: () => {
        dispatch(getAuthorList());
    },
});

const ContentCourse: React.SFC<OwnProps> = (props) => {
    const { contentStyle, courseList, history, authorList } = props;
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
                    authors={authorList.filter(a => {
                        const authorCommom = course.authorList.to.findIndex(el=> +el === +a.id);
                        if(authorCommom !==-1){
                            return a;
                        }
                    })}
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
            const { getCourseList, getAuthors } = this.props;
            getCourseList();
            getAuthors();
        }
    })
)(ContentCourse);
