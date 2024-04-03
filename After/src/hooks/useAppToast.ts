import { useState } from 'react';

// Enum defining different severity levels for toasts
export enum ToastSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Custom React hook for managing toast messages and their severity levels.
 * @returns {Object} - Object containing toast message, toast severity, and a function to show toasts.
 */
const useAppToast = () => {
  // State variables to manage toast message and severity
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastSev, setToastSev] = useState<ToastSeverity | null>(null);

  /**
   * Function to show toast message with optional severity level.
   * @param {string} message - The message to be displayed in the toast.
   * @param {ToastSeverity} severity - The severity level of the toast (default: INFO).
   */
  const showToast = (message: string, severity: ToastSeverity = ToastSeverity.INFO) => {
    // Set toast message and severity
    setToastMsg(message);
    setToastSev(severity);
    setTimeout(() => {
      setToastMsg(null);
      setToastSev(null);
    }, 5000);
  };

  // Return state variables and the function to show toasts
  return {
    toastMsg,
    toastSev,
    showToast,
  };
};

export default useAppToast;
