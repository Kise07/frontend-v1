import { useState } from "react";
import { BaseNode } from './baseNode';

export const MathNode = ({ id }) => {
  const [op, setOp] = useState('+');
  return (
    <BaseNode
      label="Math"
      color="#f59e0b"
      inputs={[{
        id: `${id}-a`,
        label: 'A'
      }, {
        id: `${id}-b`,
        label: 'B'
      }]}
      outputs={[{ id: `${id}-result` }]}
    >
      <select value={op} onChange={e => setOp(e.target.value)}
        style={{ width: '100%', fontSize: 12 }}>
        {['+', '-', '*', '/'].map(o => <option key={o}>{o}</option>)}
      </select>
    </BaseNode>
  )
}
