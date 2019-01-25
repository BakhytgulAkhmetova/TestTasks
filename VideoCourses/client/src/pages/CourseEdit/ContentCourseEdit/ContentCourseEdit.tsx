import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormCourse} from '../../../components/FormCourse';
import { Validator, } from '../../../validation/validator';
import { InterfaceAuthor, InterfaceCourse } from '../../../interfaces';
import { getAuthorList } from '../../../store/author/asyncActions';
import { default as types } from '../../../validation/typesError';
import { courseForm } from '../../../validation/validationConfig';
import { editCourse, getCourseById } from '../../../store/course/asyncActions';
import { regDateChange  } from '../../../constants';

interface OwnProps {
    contentStyle: string,
    courseForEdit: InterfaceCourse,
    getAuthors: Function,
    getCourseById: Function,
    changeCourseForm: Function,
    courseForm: InterfaceCourseFormValidated,
    handleChangeCourseForm: (e: React.FormEvent) => void,
    handleChangeDateInput: (e: React.FormEvent) => void,
    handleSaveCourse: (e: React.MouseEvent) => void,
    handleCancel: (e: React.MouseEvent) => void,
    history: any,
    editCourse: Function,
    propsContent: any,
    authorList: Array<InterfaceAuthor>
}

interface StateProps {
    authorList: Array<InterfaceAuthor>,
    courseForEdit: InterfaceCourse
}

interface InterfaceCourseFormValidated extends InterfaceCourse  {
    errors: Array<any>
}

interface DispatchProps {
    getAuthors: () => void,
    getCourseById: (id:any) => void,
    editCourse: (course: InterfaceCourse) => void,
}

const validator = new Validator({ types, config: courseForm });

const courseFormInitial: InterfaceCourseFormValidated = {
    id: -1,
    name: '',
    description: '',
    duration: 0,
    date: '',
    authorList: {
        from: [],
        to: []
    },
    errors: []
}

const mapStateToProps = (state: any): StateProps => ({
    authorList: state.author.authorList,
    courseForEdit: state.course.courseForm
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): DispatchProps => ({
    getAuthors: () => {
        dispatch(getAuthorList());
    },
    getCourseById: (id: any) => {
        dispatch(getCourseById(id));
    },
    editCourse: (course: InterfaceCourse) => {
        dispatch(editCourse(course.id, course));
    }
});

const handlers = {
    handleChangeCourseForm: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { changeCourseForm, courseForm, propsContent } = props;
        if(event.currentTarget.name === 'name') {
            changeCourseForm({...courseForm, [event.currentTarget.name]: event.currentTarget.value});
             propsContent.handleChangeLayoutCourseName(event.currentTarget.value);
        }
        else {
            changeCourseForm({...courseForm, [event.currentTarget.name]: event.currentTarget.value});
        }
    },
    handleChangeDateInput: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { changeCourseForm, courseForm } = props;
        const value: string = event.currentTarget.value;
        regDateChange.test(value)?
        changeCourseForm({...courseForm, [event.currentTarget.name]: event.currentTarget.value}): null;
    },
    handleSaveCourse: (props: OwnProps) => async () => {
        const { history, courseForm, editCourse, changeCourseForm } = props;
        const courseV = {
            name: { value: courseForm.name },
            description: { value: courseForm.description},
            date: { value: courseForm.date},
            duration: { value: courseForm.duration},
            authorList: { value: courseForm.authorList.to} 
        };
        validator.cleanListErrors();
        const hasErrors = validator.validate(courseV);
        const errorList = validator.listErrors; 
        if(hasErrors) {
            changeCourseForm({
                ...courseForm,
                errors: errorList
            })
        }
        else {
            editCourse(courseForm);
            history.push('/courses');

        }
    },
    handleCancel: (props: OwnProps) => () => {
        const { history } = props;
        history.push('/courses');
    }
}

const ContentCourseEdit: React.SFC<OwnProps> = (props) => {
    const { contentStyle,
            handleChangeCourseForm,
            handleChangeDateInput,
            courseForm,
            handleSaveCourse,
            handleCancel,
            changeCourseForm } = props;
    const contentClass = classnames('content-course-new', contentStyle);
    return(
        <div className={contentClass}>
            <FormCourse
            handleChangeDateInput={handleChangeDateInput}
            handleSaveCourse={handleSaveCourse}
            handleCancel={handleCancel}
            courseForm={courseForm}
            changeCourseForm={changeCourseForm}
            handleChangeCourseForm={handleChangeCourseForm}
            />
        </div>
    );
};

export default compose<OwnProps, {}>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withState('courseForm', 'changeCourseForm', courseFormInitial),
    withHandlers(handlers),
    lifecycle<OwnProps, {}> ({
        componentDidUpdate(prevProps) {
            if(prevProps.courseForEdit!==this.props.courseForEdit) {
            const { authorList, courseForm, changeCourseForm, courseForEdit, propsContent } = this.props;
            const authorsChosen = authorList.filter(a => {
                const authorCommom = courseForEdit.authorList.to.findIndex(el=> +el === +a.id);
                return authorCommom !==-1 ? a: null
            });
            const authorsNoChosen = authorList.filter(a => {
                const authorCommom = courseForEdit.authorList.to.findIndex(el=> +el === +a.id);
                return authorCommom ===-1 ? a: null
            });
            changeCourseForm({ ...courseForm,
                name: courseForEdit.name,
                id: courseForEdit.id,
                date: courseForEdit.date,
                description: courseForEdit.description,
                duration: courseForEdit.duration,
                authorList:{ from: authorsNoChosen, to: authorsChosen} });
                propsContent.handleChangeLayoutCourseName(courseForEdit.name);
            }
        },
        componentDidMount() {
            const { 
                    getCourseById,
                    history,
                    getAuthors } = this.props;
            const pathArray = history.location.pathname.split('/');
            getAuthors();
            getCourseById(pathArray[2]);
        }
    })
)(ContentCourseEdit);
