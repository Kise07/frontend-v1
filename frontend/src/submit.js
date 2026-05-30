// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  
  const handleSubmit = async () => {
    // Step 1: Frontend validation - check if pipeline is empty
    if (nodes.length === 0) {
      alert('Error: Add at least one node to the pipeline');
      return;
    }
    
    try {
      // Step 2: Send request to backend
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      
      // Step 3: Handle HTTP response errors
      if (!response.ok) {
        alert(`Error: Server returned ${response.status}`);
        return;
      }
      
      const data = await response.json();
      
      // Step 4: Check if backend returned a validation error
      if (!data.valid) {
        alert(`Validation Error: ${data.error}`);
        return;
      }
      
      // Step 5: Display success message with pipeline info
      alert(
        `Pipeline Valid!\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag}`
      );
    } catch (error) {
      alert(`Error: Could not connect to backend. Make sure server is running on http://localhost:8000`);
      console.error('Fetch error:', error);
    }
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
