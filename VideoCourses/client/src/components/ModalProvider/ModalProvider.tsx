import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Modal } from '../Modal';
import { InterfaceModal } from '../../interfaces';

interface StateProps {
    modal: InterfaceModal
}

interface OwnProps {
    modal: InterfaceModal
}

const mapStateToProps = (state: any): StateProps => ({
    modal: state.modal
});

const ModalProvider: React.SFC<OwnProps> = (props) => {
    const {  modal } = props;
    return (
        <Modal
        styleContent={modal.styleContent}
        isOpen={modal.isOpen}
        content={modal.content}
        header={modal.header}/>
        
    );
};

export default compose<OwnProps, {}>(
    connect(mapStateToProps)
)(ModalProvider);
