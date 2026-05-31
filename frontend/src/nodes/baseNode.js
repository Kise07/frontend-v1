import { Handle, Position } from 'reactflow';

export const BaseNode = ({ label, inputs = [], outputs = [], children, color = '#6366f1' }) => {
  return (
    <div style={{
      minWidth: 200,
      border: `1px solid ${color}`,
      borderRadius: 8,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }}>
      <div style={{
        background: color,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '8px 8px 0 0',
        fontSize: 12,
        fontWeight: 600,
      }}>
        {label}
      </div>
      <div style={{ padding: 8 }}>
        {children}
      </div>
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: `${((i + 1) / (inputs.length + 1)) * 100}%` }}
          title={input.label || input.id}
        />
      ))}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: `${((i + 1) / (outputs.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  )
}
