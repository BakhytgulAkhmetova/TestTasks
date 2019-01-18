import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormCourse} from '../../../components/FormCourse';
import { InterfaceAuthor, InterfaceCourse } from '../../../interfaces';
import { getAuthorList } from '../../../store/author/asyncActions';
import { editCourse } from '../../../store/course/asyncActions';

import './ContentCourseEdit.scss';

interface OwnProps {
    contentStyle: string,
    courseForEdit: InterfaceCourse,
    getAuthors: Function,
    getCourseById: Function,
    changeCourseForm: Function,
    courseForm: InterfaceCourse,
    handleChangeCourseForm: any,
    handleSaveCourse: any,
    handleCancel: any,
    history: any,
    editCourse: Function,
    authorList: Array<InterfaceAuthor>
}

interface StateProps {
    authorList: Array<InterfaceAuthor>,
    courseForEdit: InterfaceCourse
}

interface DispatchProps {
    getAuthors: () => void,
    editCourse: (course: InterfaceCourse) => void,
}

const courseFormInitial: InterfaceCourse = {
    id: -1,
    name: '',
    description: '',
    duration: '',
    date: 0,
    authorList: {
        from: [],
        to: []
    }
}

const mapStateToProps = (state: any): StateProps => ({
    authorList: state.author.authorList,
    courseForEdit: state.course.courseForm
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    getAuthors: () => {
        dispatch(getAuthorList());
    },
    editCourse: (course: InterfaceCourse) => {
        dispatch(editCourse(course.id, course));
    }
});

const handlers = {
    handleChangeCourseForm: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { changeCourseForm, courseForm } = props;
        changeCourseForm({...courseForm, [event.currentTarget.id]: event.currentTarget.value});
    },
    handleSaveCourse: (props: OwnProps) => async () => {
        const { history, courseForm, editCourse } = props;
        editCourse(courseForm);
        history.push('/courses');
    },
    handleCancel: (props: OwnProps) => () => {
        const { history } = props;
        history.push('/courses');
    }
}


const ContentCourseEdit: React.SFC<OwnProps> = (props) => {
    const { contentStyle,
            handleChangeCourseForm,
            courseForm,
            handleSaveCourse,
            handleCancel,
            changeCourseForm } = props;
    const contentClass = classnames('content-course-new', contentStyle);
    return(
        <div className={contentClass}>
            <FormCourse
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
            if(prevProps.authorList!==this.props.authorList) {
            const { authorList, changeCourseForm, courseForm } = this.props;
            const authorsChosen = authorList.filter(a => {
                const authorCommom = courseForm.authorList.to.findIndex(el=> +el === +a.id);
                return authorCommom !==-1 ? a: null
            });
            const authorsNoChosen = authorList.filter(a => {
                const authorCommom = courseForm.authorList.to.findIndex(el=> +el === +a.id);
                return authorCommom ===-1 ? a: null
            });
            changeCourseForm({ ...courseForm, authorList:{ from: authorsNoChosen, to: authorsChosen} });
            }
        },
        componentDidMount() {
            const { changeCourseForm, courseForEdit, getAuthors } = this.props;
            changeCourseForm(courseForEdit);
            getAuthors();
        }
    })
)(ContentCourseEdit);
