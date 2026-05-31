// inputNode.js

import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      label="Input"
      color="#10b981"
      outputs={[{ id: `${id}-value` }]}
    >
      {/* Custom input-specific Ui */}
      <label style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  )
}
