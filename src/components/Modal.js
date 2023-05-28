import { Dialog } from 'primereact/dialog';
import React from 'react';

const Modal = ({ header, visible, onClick, onClose, children }) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      onClick={onClick}
      style={{ width: '50vw' }}
      onHide={onClose}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
