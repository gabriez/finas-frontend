import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomModal = ({ className, show, onClose, children }) => {
  return (
    <Modal className={ className}
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {/* <button onClick={onClose} className="mb-4 bg-red-500 text-white p-2 rounded">Cerrar</button> */}
      {children}
    </Modal>
  );
};

export default CustomModal;
