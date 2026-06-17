import ToastItem from "./ToastItem";
import { memo } from "react";
import styles from "../styles/ToastContainer.module.css";

const ToastContainer = ({ toasts, position, removeToast }) => {
  return (
    <div
      className={`${styles.container} ${styles[position]}`}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default memo(ToastContainer);
