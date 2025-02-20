import React from 'react';
import '../../media/style/Modal.css'; // Add CSS styles for the modal

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* <button className="modal-close" onClick={onClose}>
          &times;
        </button> */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
