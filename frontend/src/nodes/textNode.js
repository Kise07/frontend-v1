// textNode.js

import { useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  return (
    <div style={{
      minWidth: 200,
      maxWidth: 300,
      border: '1px solid #6366f1',
      borderRadius: 8,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Header */}
      <div style={{
        background: '#6366f1',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '8px 8px 0 0',
        fontSize: 12,
        fontWeight: 600,
      }}>
        Text
      </div>

      {/* Body */}
      <div>
        <label style={{
          fontSize: 12, color: '#666'
        }}>
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: 4,
            fontSize: 12,
            fontFamily: 'monospace',
            minHeight: 40,
            boxSizing: 'border-box',
          }}
        />
        {variables.length > 0 && (
          <div style={{ fontSize: 10, color: '#6366f1', marginTop: 4 }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Dynamix input handles for each {{variable}} */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
          title={v}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
