// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      label="Output"
      color="#ef4444"
      inputs={[{ id: `${id}-value` }]}
    >
      {/* Custom output-specific UI */}
      <label style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
