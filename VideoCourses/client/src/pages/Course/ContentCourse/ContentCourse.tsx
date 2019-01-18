import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { InterfaceCourse, InterfaceAuthor } from '../../../interfaces';
import { getCourseById, getCourseList, getCourseListByName } from '../../../store/course/asyncActions';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';
import { getAuthorList } from '../../../store/author/asyncActions';

import './ContentCourse.scss';

interface OwnProps {
    contentStyle: string,
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    getCourseList: Function,
    getCourseById: Function,
    getAuthors: Function,
    handleOpenEditPage: any,
    history: any,
    inputFilter: string,
    changeInputFilter: Function,
    handleChangeInput: any,
    handleOnSearch:any,
    filterCourseList: Function

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
    filterCourseList: (param: string) => void,
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
    filterCourseList: (param: string) => {
        dispatch(getCourseListByName(param));
    },
});

const handlers = {
    handleOpenEditPage: (props: OwnProps) => async (event: React.MouseEvent<HTMLElement>) => {
        const { history, getCourseById }  = props;
        const id = event.currentTarget.id;
        const path = '/courses/' + id;
        await getCourseById(id);
        history.push(path)
    },
    handleOnSearch: (props: OwnProps) => () => {
        const { inputFilter, filterCourseList } = props;
        filterCourseList(inputFilter);
    }
}

const ContentCourse: React.SFC<OwnProps> = (props) => {
    const { contentStyle,
            courseList,
            history, authorList,
            inputFilter,
            changeInputFilter,
            handleChangeInput,
            handleOnSearch,
            handleOpenEditPage } = props;
    const contentClass = classnames('content-courses', contentStyle);
    return(
        <div className={contentClass}>
            <div className='courses__options'>
                <FormFilter 
                handleOnSearch={handleOnSearch}
                handleChangeInput={handleChangeInput}
                inputFilter={inputFilter}
                changeInputFilter={changeInputFilter}
                filterSizeStyle='content-courses__filter'/>
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
    withState('inputFilter', 'changeInputFilter', '' ),
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
