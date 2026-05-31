import { BaseNode } from "./baseNode";

export const FileNode = ({ id }) => (
  <BaseNode
    label="File"
    color="#64748b"
    outputs={[{ id: `${id}-content` }]}
  >
    <input type="file" style={{ fontSize: 11, width: '100%' }} />
  </BaseNode>
)
