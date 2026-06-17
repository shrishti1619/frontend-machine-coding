import {
  DEFAULT_TOAST_DURATION,
  TOAST_POSITIONS,
  TOAST_TYPES,
  MAX_VISIBLE_TOAST,
} from "./constants/toastConstants";
import ToastContainer from "./components/ToastContainer";
import { ToastContext } from "./context/ToastContext";
import { useCallback, useMemo, useState } from "react";

const ToastProvider = ({ children, position = TOAST_POSITIONS.TOP_RIGHT }) => {
  const [toasts, setToasts] = useState([]);
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  const showToast = useCallback((options) => {
    if (!options?.message?.trim()) return;
    const newToast = {
      id: crypto.randomUUID(),
      message: options.message,
      type: options.type || TOAST_TYPES.INFO,
      duration: options.duration || DEFAULT_TOAST_DURATION,
    };
    setToasts((prevToasts) =>
      [...prevToasts, newToast].slice(-MAX_VISIBLE_TOAST),
    );
  }, []);
  const contextValue = useMemo(() => {
    return {
      showToast,
      removeToast,
    };
  }, [showToast, removeToast]);
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        removeToast={removeToast}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
