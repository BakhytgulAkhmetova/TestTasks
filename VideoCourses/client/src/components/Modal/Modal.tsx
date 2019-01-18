import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import './Modal.scss';

interface OwnProps {
    modal: {
        header: any,
        content: any
    },
    handleClose: any
}

const handlers = {
    handleClose: () => () => {
        
    }
}

const Modal: React.SFC<OwnProps> = (props) => {
    const { modal, handleClose } = props;
    return(
        <div className="modal">
            <div className='modal-content'>
            <span onClick={handleClose} className="close">&times;</span>
            <div>{modal.header}</div>
            <div>{modal.content}</div>
            </div>
        </div>

    );
}

export default compose<OwnProps, {}>(
    withHandlers(handlers)
)(Modal);
