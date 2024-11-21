import React from 'react';

const Message = ({ text, type, onClose }) => {
  const styles = {
    success: 'alert alert-success alert-dismissible fade show',
    error: 'alert alert-danger alert-dismissible fade show',
    info: 'alert alert-info alert-dismissible fade show',
  };

  return text ? (
    <div
      className={`${styles[type]} position-fixed`}
      role="alert"
      style={{
        top: '5px', // Position from the top of the screen
        right: '400px', // Position from the right side
        width: 'auto', // Adjust the width to fit content
        maxWidth: '400px', // Optional: limit width for a cleaner look
        zIndex: 1050, // Ensure it's above other elements
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a soft shadow
        borderRadius: '8px', // Round the corners
        padding: '15px',
      }}
    >
      <strong>{text}</strong>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '-40px', // Position the close button from the top
          right: '-10px', // Position the close button from the right
          fontSize: '12px', // Small font size
          background: 'transparent', // Transparent background
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
    </div>
  ) : null;
};

export default Message;
