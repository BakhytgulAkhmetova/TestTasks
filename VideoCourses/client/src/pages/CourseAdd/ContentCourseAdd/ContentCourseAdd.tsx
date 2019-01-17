import React from 'react';
import Redux from 'redux';
import classnames from 'classnames';
import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {FormCourse} from '../../../components/FormCourse';
import { InterfaceAuthor } from '../../../interfaces';
import { getAuthorList } from '../../../store/author/asyncActions';
import { InterfaceCourse } from '../../../interfaces';

import './ContentCourseAdd.scss';

interface OwnProps {
    contentStyle: string,
    getAuthors: Function,
    changeCourseForm: Function,
    courseForm: InterfaceCourse,
    handleChangeCourseForm: any,
    authorList: Array<InterfaceAuthor>
}

interface StateProps {
    authorList: Array<InterfaceAuthor>
}

interface DispatchProps {
    getAuthors: () => void
}

const courseFormInitial: InterfaceCourse = {
    id: -1,
    name: '',
    description: '',
    duration: 0,
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
    }
});

const handlers = {
    handleChangeCourseForm: (props: OwnProps) => (event: React.FormEvent<HTMLInputElement>) => {
        const { changeCourseForm, courseForm } = props;
        changeCourseForm({...courseForm, [event.currentTarget.id]: event.currentTarget.value});
    }
}


const ContentCourseAdd: React.SFC<OwnProps> = (props) => {
    const {contentStyle, handleChangeCourseForm, courseForm } = props;
    const contentClass = classnames('content-course-new', contentStyle);
    debugger;
    return(
        <div className={contentClass}>
            <FormCourse
            courseForm={courseForm}
            handleChangeCourseForm={handleChangeCourseForm}
            />
        </div>
    );
};

export default compose<OwnProps, {}>(
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
)(ContentCourseAdd);
