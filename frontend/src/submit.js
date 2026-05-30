// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });
    const data = await response.json();
    alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
      <button onClick={handleSubmit} style={{
        padding: '10px 30px',
        background: '#6366f1',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
      }}>Submit Pipeline</button>
    </div>
  );
}
