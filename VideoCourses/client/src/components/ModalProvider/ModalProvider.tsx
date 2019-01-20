import React from 'react';
import Redux from 'redux';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { Modal } from '../Modal';
import { InterfaceModal } from '../../interfaces';
import { closeModal } from '../../store/modal/actionCreators';

interface StateProps {
    modal: InterfaceModal
}

interface DispatchProps {
    closeModal: () => void;
}

interface StateProps {
    modal: InterfaceModal
}

interface OwnProps {
    modal: InterfaceModal,
    handleCloseModal: ()=> void,
    closeModal: Function
}

const mapStateToProps = (state: any): StateProps => ({
    modal: state.modal
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, props:OwnProps): DispatchProps => ({
    closeModal: () => {
        dispatch(closeModal());
    }
});

const ModalProvider: React.SFC<OwnProps> = (props) => {
    const {  modal, handleCloseModal } = props;
    return (
        <Modal
            handleCloseModal={handleCloseModal}
            modal={modal}/>
    );
};

export default compose<OwnProps, {}>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        handleCloseModal: (props: OwnProps) => () => {
            props.closeModal();
        }
    })
)(ModalProvider);
