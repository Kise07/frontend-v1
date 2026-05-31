import { useState } from "react"
import { BaseNode } from "./baseNode";

export const ConditionalNode = ({ id }) => {
  const [condition, setCondition] = useState('value > 0');
  return (
    <BaseNode
      label="Conditional"
      color="#ef4444"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-true`, label: 'True' }, { id: `${id}-false`, label: 'False' }]}
    >
      <input value={condition} onChange={e => setCondition(e.target.value)}
        placeholder="condition"
        style={{ width: '100%', fontSize: 12, border: '1px solid #ddd', borderRadius: 4, padding: 4, boxSizing: 'border-box' }} />
    </BaseNode>
  )
}
