import "./App.css";
import { TOAST_TYPES } from "./components/Toast/constants/toastConstants";
import { useToast } from "./components/Toast/hooks/useToast";

function App() {
  const { showToast } = useToast();
  return (
    <main style={styles.container}>
      <h1>Toast Component</h1>
      <button
        onClick={() =>
          showToast({
            message: "Saved successfully",
            type: TOAST_TYPES.SUCCESS,
          })
        }
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          showToast({
            message: "Something went wrong",
            type: TOAST_TYPES.ERROR,
          })
        }
      >
        Show Error Toast
      </button>
      <button
        onClick={() =>
          showToast({
            message: "Please check your input",
            type: TOAST_TYPES.WARNING,
          })
        }
      >
        Show Warning Toast
      </button>
      <button
        onClick={() =>
          showToast({
            message: "New update available",
            type: TOAST_TYPES.INFO,
          })
        }
      >
        Show Info Toast
      </button>
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
  },
};

export default App;
