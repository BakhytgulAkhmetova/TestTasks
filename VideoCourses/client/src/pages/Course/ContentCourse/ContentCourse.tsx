import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { InterfaceCourse, InterfaceAuthor } from '../../../interfaces';
import { getCourseById } from '../../../store/course/asyncActions';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';
import { getAuthorList } from '../../../store/author/asyncActions';
import { getCourseList } from '../../../store/course/asyncActions';

import './ContentCourse.scss';

interface OwnProps {
    cour: any,
    contentStyle: string,
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    getCourseList: Function,
    getCourseById: Function,
    getAuthors: Function,
    handleOpenEditPage: any,
    history: any
}

interface StateProps {
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    cour: any
}

interface DispatchProps {
    getCourseList: () => void,
    getCourseById: (id:any) => void,
    getAuthors: () => void,
}

const mapStateToProps = (state: any): StateProps => ({
    courseList: state.course.courseList,
    authorList: state.author.authorList,
    cour:state.course.courseForm
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): DispatchProps => ({
    getCourseList: () => {
        dispatch(getCourseList());
    },
    getCourseById: async (id: any) => {
       await dispatch(getCourseById(id));
    },
    getAuthors: () => {
        dispatch(getAuthorList());
    },
});

const handlers = {
    handleOpenEditPage: (props: OwnProps) => (event: React.MouseEvent<HTMLElement>) => {
        const { history, getCourseById, cour }  = props;
        const id = event.currentTarget.id;
        const path = '/courses/' + id;
        getCourseById(id).then(() => {
            debugger;
            console.log(cour);
            history.push(path);
        });
    }
}

const ContentCourse: React.SFC<OwnProps> = (props) => {
    const { contentStyle, courseList, history, authorList, handleOpenEditPage } = props;
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
                    handleOpenEditPage={handleOpenEditPage}
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
    }),
    withHandlers(handlers)
)(ContentCourse);
