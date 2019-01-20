import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import  { ContentDeleteCourse } from '../../../modalViews/deleteCourse/ContentDeleteCourse';
import { InterfaceCourse, InterfaceAuthor } from '../../../interfaces';
import { getCourseList, getCourseListByName } from '../../../store/course/asyncActions';
import { FormFilter } from '../FormFilter';
import { CourseItem } from '../CourseItem';
import { getAuthorList } from '../../../store/author/asyncActions';
import { fillHeader, fillContent, openModal, changeStyle, closeModal } from '../../../store/modal/actionCreators';

import './ContentCourse.scss';

interface OwnProps {
    contentStyle: string,
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    getCourseList: () => void,
    getAuthors: Function,
    handleOpenEditPage: (e: React.MouseEvent) => void,
    history: any,
    inputFilter: string,
    changeInputFilter: Function,
    handleChangeInput: any,
    handleOnSearch:() => void,
    filterCourseList: (param: string) => void,
    handleOpenDeleteModal: (e: React.MouseEvent) => void,
    openModalDeleteCourse: (id: any) => void

}

interface StateProps {
    courseList: Array<InterfaceCourse>,
    authorList: Array<InterfaceAuthor>,
    cour: any
}

interface DispatchProps {
    getCourseList: () => void,
    getAuthors: () => void,
    filterCourseList: (param: string) => void,
    openModalDeleteCourse: (id: any) => void,
    closeModal: () => void;
}

const mapStateToProps = (state: any): StateProps => ({
    courseList: state.course.courseList,
    authorList: state.author.authorList,
    cour:state.course.courseForm
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, props:OwnProps): DispatchProps => ({
    getCourseList: () => {
        dispatch(getCourseList());
    },
    getAuthors: () => {
        dispatch(getAuthorList());
    },
    filterCourseList: (param: string) => {
        dispatch(getCourseListByName(param));
    },
    openModalDeleteCourse: (id: any) => {
        dispatch(fillHeader(<h1 className='header-delete-course'>Вы действительно хотите удалить курс?</h1>));
        dispatch(fillContent(<ContentDeleteCourse courseId={id}/>));
        dispatch(changeStyle('modal-content-delete'));
        dispatch(openModal());
    },
    closeModal: () => {
        dispatch(closeModal());
    }
});

const handlers = {
    handleOpenEditPage: (props: OwnProps) => async (event: React.MouseEvent<HTMLElement>) => {
        const { history }  = props;
        const id = event.currentTarget.id;
        const path = '/courses/' + id;
        history.push(path);
    },
    handleOpenDeleteModal: (props: OwnProps) => (e: React.MouseEvent<HTMLElement>) => {
        const { openModalDeleteCourse } = props;
        openModalDeleteCourse(e.currentTarget.id);
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
            handleOpenDeleteModal,
            handleOpenEditPage } = props;
    const contentClass = classnames('content-courses', contentStyle);
    return(
        <div className={contentClass}>
            <div className='courses__options'>
                <FormFilter 
                handleOnSearch={handleOnSearch}
                inputFilter={inputFilter}
                changeInputFilter={changeInputFilter}
                filterSizeStyle='content-courses__filter'/>
                <button className='content-courses__button' 
                        onClick={ () => (history.push('/courses/new') ) } >Добавить курс</button>
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
                    handleOpenDeleteModal={handleOpenDeleteModal}
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
    withState('inputFilter', 'changeInputFilter', '' ),
    withHandlers(handlers),
    lifecycle<OwnProps, {}> ({
        componentDidMount() {
            const { getCourseList, getAuthors } = this.props;
            getCourseList();
            getAuthors();
        }
    }),
)(ContentCourse);
