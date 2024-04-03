import { useState } from 'react';

export enum ToastSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

const useAppToast = () => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastSev, setToastSev] = useState<ToastSeverity | null>(null);

  const showToast = (message: string, severity: ToastSeverity = ToastSeverity.INFO) => {
    setToastMsg(message);
    setToastSev(severity);
    setTimeout(() => {
      setToastMsg(null);
      setToastSev(null);
    }, 5000); // Hide toast after 5 seconds
  };

  return {
    toastMsg,
    toastSev,
    showToast,
  };
};

export default useAppToast;