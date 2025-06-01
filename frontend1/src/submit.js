import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  console.log('About to submit → Nodes:', nodes);
  console.log('About to submit → Edges:', edges);
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      alert(`Number of nodes: ${result.num_nodes}\nNumber of edges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Failed to submit pipeline: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <button type="button" onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000814',
    color: '#00f0ff',
    border: '2px solid #00f0ff',
    borderRadius: '8px',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 0 10px #00f0ff',
    transition: 'all 0.3s ease',
  },
};
