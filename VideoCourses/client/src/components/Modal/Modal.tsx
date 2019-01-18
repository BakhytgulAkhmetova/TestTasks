import React from 'react';
import { compose, withHandlers } from 'recompose';
import classnames from 'classnames';

import { InterfaceModal } from '../../interfaces';

import './Modal.scss';

const handlers = {
    handleClose: () => () => {
        
    }
}

const Modal: React.SFC<InterfaceModal> = (props) => {
    const { isOpen, header, content, styleContent } = props;
    const modalClass = classnames({'display': isOpen, 'modal': true } );
    return(
        <div className={ modalClass }>
            <div className={styleContent}>
            <span className="close">&times;</span>
            <div>{header}</div>
            <div>{content}</div>
            </div>
        </div>
    );
}

export default compose<InterfaceModal, InterfaceModal>(
    withHandlers(handlers)
)(Modal);
