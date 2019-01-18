import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {FormCourse} from '../../../components/FormCourse';
import { InterfaceAuthor } from '../../../interfaces';
import { getAuthorList } from '../../../store/author/asyncActions';
import { addCourse } from '../../../store/course/asyncActions';
import { InterfaceCourse } from '../../../interfaces';

import './ContentCourseEdit.scss';

interface OwnProps {
    contentStyle: string,
    getAuthors: Function,
    addCourse: Function,
    changeCourseForm: Function,
    courseForm: InterfaceCourse,
    handleChangeCourseForm: any,
    handleSaveCourse: any,
    handleCancel: any,
    history: any,
    authorList: Array<InterfaceAuthor>
}

interface StateProps {
    authorList: Array<InterfaceAuthor>
}

interface DispatchProps {
    getAuthors: () => void,
    addCourse: (course: InterfaceCourse) => void
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
    authorList: state.author.authorList
});
   
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps => ({
    getAuthors: () => {
        dispatch(getAuthorList());
    },
    addCourse: (course: InterfaceCourse) => {
        dispatch(addCourse(course));
    }
});

const handlers = {
    handleChangeCourseForm: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { changeCourseForm, courseForm } = props;
        changeCourseForm({...courseForm, [event.currentTarget.id]: event.currentTarget.value});
    },
    handleSaveCourse: (props: OwnProps) => async () => {
        const { history, addCourse, courseForm } = props;
        await addCourse(courseForm);
        history.push('./courses');
    },
    handleCancel: (props: OwnProps) => () => {
        const { history } = props;
        history.push('./courses');
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
            changeCourseForm({ ...courseForm, authorList:{ from: authorList, to: []} });
            }
        },
        componentDidMount() {
            const { getAuthors } = this.props;
            getAuthors();
        }
    })
)(ContentCourseEdit);