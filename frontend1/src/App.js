import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={styles.appContainer}>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#000814',
    color: '#00f0ff',
    fontFamily: "'Courier New', Courier, monospace",
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default App;



    