import React from 'react';
import Redux from 'redux';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { closeModal } from '../../../store/modal/actionCreators';
import { deleteCourse } from '../../../store/course/asyncActions'

import './ContentDeleteCourse.scss';

interface OwnProps {
    handleDeleteCourse: (e: React.MouseEvent)=> void,
    handleCloseModal: () => void,
    closeModal: () => void,
    courseId: any,
    deleteCourse: (id: any) => void
}

interface AnotherProps {
    courseId: any
}

interface DispatchProps {
    closeModal: () => void,
    deleteCourse: (id: any) => void
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, props:OwnProps): DispatchProps => ({
    closeModal: () => {
        dispatch(closeModal());
    },
    deleteCourse: (id: any) => {
        dispatch(deleteCourse(id));
    }
});

const handlers = {
    handleCloseModal: (props: OwnProps) => () => {
        props.closeModal();
    },
    handleDeleteCourse: (props: OwnProps) => async (event: React.MouseEvent<HTMLElement>) => {
        const {deleteCourse, closeModal } = props;
        await deleteCourse(event.currentTarget.id);
        closeModal();
    }
}

const ContentDeleteCourse: React.SFC<OwnProps> = ({ handleCloseModal, courseId, handleDeleteCourse}) => {
    return(
        <div className='btn-group-delete-course'>
            <button 
                id={courseId}
                onClick={handleDeleteCourse}
                type='button'>Да</button>
            <button 
                onClick={handleCloseModal}
                type='button'>Нет</button>
        </div>
    );
};

export default compose<OwnProps, AnotherProps>(
    connect(null, mapDispatchToProps),
    withHandlers(handlers)
)(ContentDeleteCourse);
