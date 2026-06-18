import Typeahead from "./components/Typeahead/Typeahead";

function App() {
  return (
    <main style={styles.container}>
      <h1>Typeahead</h1>
      <Typeahead />
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
  },
};

export default App;
