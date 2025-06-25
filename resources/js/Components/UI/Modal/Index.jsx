// Modal.jsx
import React, { useRef, useEffect } from "react"; // Explicitly import React for JSX
import PropTypes from 'prop-types'; // Import PropTypes for validation

/**
 * Modal component displays a customizable modal dialog.
 * It handles opening/closing, escape key dismissal, and body scroll locking.
 *
 * @param {object} props - The props for the Modal component.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function(): void} props.onClose - Callback function to close the modal.
 * @param {string} [props.className] - Optional additional CSS classes for the modal content area.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal.
 * @param {boolean} [props.showCloseButton=true] - If true, displays a close button in the top right corner.
 * @param {boolean} [props.isFullscreen=false] - If true, the modal will take full screen width and height.
 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true, // JavaScript default parameter
  isFullscreen = false,   // JavaScript default parameter
}) => {
  /** @type {React.MutableRefObject<HTMLDivElement | null>} */
  const modalRef = useRef(null);

  // Effect to handle Escape key press for closing the modal
  useEffect(() => {
    /**
     * Handles the keydown event to close the modal on 'Escape' key press.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    const handleEscape = (event) => { // Removed type annotation
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes

  // Effect to toggle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling of the background body
    } else {
      document.body.style.overflow = "unset"; // Restore body scrolling
    }

    // Cleanup function to ensure scroll is always reset when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]); // Re-run effect if isOpen changes

  // If modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  // Determine modal content styling based on full screen prop
  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl bg-white dark:bg-gray-900";

  return (
    // Overlay for the modal
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      {/* Backdrop (hidden if fullscreen) */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
          onClick={onClose} // Close modal when clicking on backdrop
        ></div>
      )}
      {/* Modal Content Container */}
      <div
        ref={modalRef} // Attach ref to content container
        className={`${contentClasses} ${className || ''}`} // Apply content and additional classes
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        {/* Close Button (conditionally rendered) */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            {/* Close Icon SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.9550 7.4576C18.3455 7.06707 18.3455 6.43391 17.9550 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
        <div>{children}</div> {/* Render modal content */}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  isFullscreen: PropTypes.bool,
};

export default Modal;