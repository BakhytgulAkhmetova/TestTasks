import React from 'react';
import { compose, withHandlers } from 'recompose';
import classnames from 'classnames';

import { InterfaceModal } from '../../interfaces';

import './Modal.scss';

interface OwnProps {
    modal: InterfaceModal,
    handleCloseModal: any
}

const Modal: React.SFC<OwnProps> = (props) => {
    const { modal, handleCloseModal } = props;
    const modalClass = classnames({'display': modal.isOpen, 'modal': true } );
    return(
        <div className={ modalClass }>
            <div className={modal.styleContent}>
            <span onClick={handleCloseModal} className="close">&times;</span>
            <div>{modal.header}</div>
            <div>{modal.content}</div>
            </div>
        </div>
    );
}

export default Modal;