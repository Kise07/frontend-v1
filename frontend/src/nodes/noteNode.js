import { useState } from "react"
import { BaseNode } from "./baseNode";

export const NoteNode = ({ id }) => {
  const [note, setNote] = useState('Add a note....');
  return (
    <BaseNode
      label="Note"
      color="#10b981"
    >
      <textarea value={note} onChange={e => setNote(e.target.value)}
        style={{ width: '100%', fontSize: 12, resize: 'none', border: '1px solid #ddd', borderRadius: 4, padding: 4, minHeight: 60, boxSizing: 'border-box' }}
      />
    </BaseNode>
  )
}
