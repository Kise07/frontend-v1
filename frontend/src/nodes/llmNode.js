// llmNode.js

import { BaseNode } from "./baseNode";

export const LLMNode = ({ id }) => (
  <BaseNode
    label="LLM"
    color="#8b5cf6"
    inputs={[
      { id: `${id}-system`, label: 'System' },
      { id: `${id}-prompt`, label: 'Prompt' },
    ]}
    outputs={[{ id: `${id}-response` }]}
  >
    <p style={{ fontSize: 12, color: '#666', margin: 0 }}>Large Language Model</p>
  </BaseNode>
)
