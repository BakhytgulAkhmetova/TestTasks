import React from 'react';
import Redux from 'redux';
// import { connect } from 'react-redux';
import { Modal } from '../Modal';
// import Modal from 'react-modal';

// import { closeModal } from '../../store/modal/actionCreators';

interface StateProps {
    isOpen: boolean
}

interface DispatchProps {
    onClose:() => void
}

const mapStateToProps = (state: any): StateProps => ({
    isOpen: state.modal.isOpen
});

const mapDispatchToProps = () => ({
    // onClose: () => dispatch(closeModal())
});

interface OwnProps {

}

const ModalProvider: React.SFC<OwnProps> = (props) => {
    //const { modal } = props;
    return (
        <div></div>
    ); 
};

export default ModalProvider;
