import ReactDom from 'react-dom';

import ModalContent from './ModalContent';

function AddAccountModal ({ onClose }) {
    const wrapperClasses = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'grey',
        opacity: 0.8
    };

    const modalClasses = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        backgroundColor: 'white'
    };

    const modalMarkup = <div>
        <div style={wrapperClasses} onClick={onClose}></div>
        <div style={modalClasses}>
            <ModalContent onClose={onClose} />
        </div>
    </div>
    
    return ReactDom.createPortal(modalMarkup, document.querySelector('.modal-container'));
};

export default AddAccountModal;