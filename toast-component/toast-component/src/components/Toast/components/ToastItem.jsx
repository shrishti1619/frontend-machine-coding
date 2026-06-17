import { useEffect, useRef } from "react";
import styles from "../styles/ToastItem.module.css";

const TOAST_ICONS = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};
const ToastItem = ({ toast, onRemove }) => {
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(toast.duration);
  const startTimeRef = useRef(null);
  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onRemove(toast.id);
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    const elapsedTime = Date.now() - startTimeRef.current;
    remainingTimeRef.current -= elapsedTime;
  };
  const resumeTimer = () => {
    startTimer();
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearTimeout(timerRef.current);
    };
  });
  const isErrorToast = toast.type === "error";
  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      role={isErrorToast ? "alert" : "status"}
      aria-live={isErrorToast ? "assertive" : "polite"}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <span className={`${styles.icon}`}>{TOAST_ICONS[toast.type]}</span>
      <p className={`${styles.message}`}>{toast.message}</p>
      <button
        type="button"
        className={`${styles.closeButton}`}
        onClick={() => onRemove(toast.id)}
        aria-label={`Close ${toast.type} notification`}
      >
        X
      </button>
    </div>
  );
};

export default ToastItem;
