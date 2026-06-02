# VectorShift Frontend Technical Assessment

**VectorShift frontend technical assessment — React pipeline UI builder with drag-and-drop nodes, dynamic variables, and DAG validation.**

> Completed as part of the VectorShift frontend technical assessment (via WorkAtAStartup / Y Combinator).

## Assessment Requirements

### Part 1: Node Abstraction
- Create abstraction for nodes to reduce code duplication
- Make 5 new nodes to demonstrate flexibility
- Apply abstraction to existing nodes

### Part 2: Styling
- Style components into appealing unified design
- Apply consistent colors and styling across all nodes

### Part 3: Text Node Logic
- Dynamic width/height that expands as user types
- Extract `{{ variable }}` patterns from text
- Create dynamic input handles for each variable

### Part 4: Backend Integration
- Frontend: Send nodes/edges to backend on submit
- Backend: Validate pipeline, calculate num_nodes, num_edges, check DAG
- Display results in user-friendly alert

## What Was Built

### Part 1: Node Abstraction
- `BaseNode.js` - Reusable component pattern reducing code duplication
- 5 new nodes: API Call, Conditional, File, Math, Note
- All nodes refactored to use BaseNode (Input, Output, LLM, Text)
- Demonstrates flexibility: creating new nodes is now ~10 lines of code

### Part 2: Styling
- Color-coded nodes (blue, red, green, purple, amber, slate)
- Professional styling with shadows, borders, responsive spacing
- Consistent design language via BaseNode abstraction

### Part 3: Text Node Logic
- Auto-expanding textarea using `scrollHeight` measurement
- `{{ variable }}` regex extraction (`/\{\{(\w+)\}\}/g`)
- Dynamic input handles created per detected variable
- Initial variables parsed on component mount (uses lazy init)
- Variables displayed below textarea for clarity

### Part 4: Backend Integration
- Submit button with comprehensive error handling
- FastAPI backend with validation logic
- DAG cycle detection using DFS algorithm
- Edge endpoint validation (both source and target must exist)
- User-friendly alerts displaying num_nodes, num_edges, is_dag
- Try-catch error handling and empty pipeline validation

## How to Run

### Prerequisites
- Node.js (v18+)
- Python 3.8+

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

Backend API available at `http://localhost:8000`

### Testing the App

1. Drag nodes from the toolbar onto the canvas
2. Connect nodes by dragging from output handles to input handles
3. Try entering `{{ input }}` or `{{ name }}` in a Text node to see dynamic handles appear
4. Create a simple pipeline and click "Submit Pipeline"
5. View the validation result (number of nodes, edges, and whether it's a valid DAG)

## Tech Stack

### Frontend
- React 18.2.0
- ReactFlow 11.8.3 (node-based editor)
- Zustand (lightweight state management)
- JavaScript ES6+

### Backend
- FastAPI
- Pydantic (data validation)
- Python 3.8+

### Architecture
- Drag-and-drop canvas UI
- REST API integration
- DAG validation with depth-first search algorithm

## Key Features

- **BaseNode Abstraction** - DRY principle, reduces code duplication, easy to add new node types
- **Variable Extraction** - `{{ name }}` patterns automatically create input handles
- **Auto-sizing** - Textarea expands/contracts with content
- **DAG Validation** - Backend detects cycles in pipeline graphs
- **Color-coded Nodes** - Visual distinction between node types
- **Error Handling** - Try-catch blocks, validation checks, friendly error messages
- **Professional Styling** - Consistent design with shadows, borders, responsive layout
- **Optimized State** - Zustand individual selectors for minimal re-renders

## Project Structure

```
frontend/
├── src/
│   ├── nodes/
│   │   ├── baseNode.js          (abstraction template)
│   │   ├── inputNode.js
│   │   ├── outputNode.js
│   │   ├── llmNode.js
│   │   ├── textNode.js          (with variable extraction)
│   │   ├── apiNode.js           (new)
│   │   ├── conditionalNode.js   (new)
│   │   ├── fileNode.js          (new)
│   │   ├── mathNode.js          (new)
│   │   └── noteNode.js          (new)
│   ├── App.js
│   ├── ui.js                    (ReactFlow canvas)
│   ├── toolbar.js               (draggable nodes)
│   ├── submit.js                (backend integration)
│   ├── store.js                 (Zustand state)
│   └── draggableNode.js
├── package.json
└── .gitignore

backend/
├── main.py                      (FastAPI server)
├── .gitignore
└── venv/
```

## Implementation Notes

- **Plain JavaScript** - This assessment uses JavaScript, not TypeScript
- **Pydantic Configuration** - Uses `model_config = {'extra': 'ignore'}` to handle ReactFlow node objects with extra fields
- **DFS Algorithm** - DAG validation uses depth-first search with recursion stack for cycle detection
- **Lazy State Init** - Text node variables initialize from `data?.text` to ensure handles appear on first render
- **Individual Zustand Selectors** - Submit button uses `useStore((state) => state.nodes)` pattern instead of destructuring for optimized rendering

## Development History

```
587d2df fix: Corrected the 4 Error
97c2b8e fix: created .gitignore
59c1024 feat: 5 New Created and Checked
9e17558 fix: import line removed
573367c feat: Task-1 Node Abstraction & Styling
c9d03fa feat: Task-2 Text Node Dynamic Varibles
ffaea4b fix: Zustand, individual renders
ebf314e fix: BaseModel -> Output
de5f0ba fix: Added try-catch in logic
719b694 feat: Task-4 Submit button + backend v1
67fa9c1 feat: initial commit
```
