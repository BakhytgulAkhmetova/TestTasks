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
import { fillHeader, fillContent, openModal, changeStyle, closeModal } from '../../../store/modal/actionCreators';

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
    filterCourseList: Function,
    handleOpenDeleteModal: any,
    openModalDeleteCourse: Function,
    handleCloseModal: any,
    handleDeleteCourse: any,
    closeModal: Function

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
    openModalDeleteCourse: () => void,
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
    getCourseById: async (id: any) => {
       await dispatch(getCourseById(id));
    },
    getAuthors: () => {
        dispatch(getAuthorList());
    },
    filterCourseList: (param: string) => {
        dispatch(getCourseListByName(param));
    },
    openModalDeleteCourse: () => {
        const { handleCloseModal, handleDeleteCourse } = props;

        dispatch(fillHeader(<h1 className='header-delete-course'>Вы действительно хотите удалить курс?</h1>));
        dispatch(fillContent(<div className='btn-group-delete-course'>
            <button onClick={handleDeleteCourse} type='button'>Да</button>
            <button onClick={handleCloseModal} type='button'>Нет</button>
        </div>));
        dispatch(changeStyle('modal-content-delete'));
        dispatch(openModal());
    },
    closeModal: () => {
        dispatch(closeModal());
    }
});

const handlers = {
    handleOpenEditPage: (props: OwnProps) => async (event: React.MouseEvent<HTMLElement>) => {
        const { history, getCourseById }  = props;
        const id = event.currentTarget.id;
        const path = '/courses/' + id;
        await getCourseById(id);
        history.push(path);
    },
    handleOpenDeleteModal: (props: OwnProps) => () => {
        const { openModalDeleteCourse } = props;
        openModalDeleteCourse();
    },
    handleOnSearch: (props: OwnProps) => () => {
        const { inputFilter, filterCourseList } = props;
        filterCourseList(inputFilter);
    },
    handleCloseModal: (props: OwnProps) => () => {
        props.closeModal();
    },
    handleDeleteCourse: (props: OwnProps) => () => {
        props.closeModal();
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
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers(handlers),
    withRouter,
    withState('inputFilter', 'changeInputFilter', '' ),
    // withHandlers(handlers),
    lifecycle<OwnProps, {}> ({
        componentDidMount() {
            const { getCourseList, getAuthors } = this.props;
            getCourseList();
            getAuthors();
        }
    }),
)(ContentCourse);
