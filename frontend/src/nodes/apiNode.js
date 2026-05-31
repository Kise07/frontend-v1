import { useState } from "react"
import { BaseNode } from "./baseNode";

export const APINode = ({ id }) => {
  const [url, setUrl] = useState('https://api.example.com');
  const [method, setMethod] = useState('GET');
  return (
    <BaseNode
      label="API Call" color="#3b82f6"
      inputs={[{ id: `${id}-body`, label: 'Body' }]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
    >
      <select value={method} onChange={e => setMethod(e.target.value)}
        style={{ width: '100%', fontSize: 12, marginBottom: 4 }}>
        {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m}>{m}</option>)}
      </select>
      <input value={url} onChange={e => setUrl(e.target.value)}
        style={{ width: '100%', fontSize: 11, border: '1px solid #ddd', borderRadius: 4, padding: 4, boxSizing: 'border-box' }} />
    </BaseNode>
  );
};
