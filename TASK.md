# VectorShift — Frontend Technical Assessment

> A node-based pipeline editor built with React Flow and FastAPI, enabling users to visually compose AI pipelines through drag-and-drop nodes, dynamic logic, and backend DAG validation.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features / Requirements](#features--requirements)
- [Implementation Plan](#implementation-plan)
- [Folder Structure](#folder-structure)
- [Key Concepts](#key-concepts)
- [API Contract](#api-contract)
- [How to Run](#how-to-run)
- [Future Improvements](#future-improvements)

---

## Project Overview

This project is a **visual pipeline builder** — similar in spirit to VectorShift's own product. Users drag and drop node types (Input, Output, LLM, Text, and custom nodes) onto a canvas, connect them with edges, and submit the pipeline to a backend for validation.

The assessment covers four core areas:

1. **Refactoring** existing node code into a reusable abstraction
2. **Styling** the UI into a polished, unified design
3. **Enhancing** the Text node with auto-resize and dynamic variable handles
4. **Integrating** the React frontend with a FastAPI backend for pipeline analysis

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, React Flow, Zustand       |
| Styling  | CSS Modules / Tailwind / Styled-components *(your choice)* |
| Backend  | Python 3.10+, FastAPI, Uvicorn      |
| State    | Zustand                             |
| HTTP     | Fetch API (frontend → backend)      |
| Graph    | Custom DAG detection (BFS/DFS)      |

---

## Features / Requirements

### Part 1 — Node Abstraction

**Problem:** All four existing nodes (`inputNode.js`, `outputNode.js`, `llmNode.js`, `textNode.js`) share significant boilerplate — wrapper `<div>`, title bar, `Handle` declarations, and inline styles.

**Goal:** Create a `BaseNode` component that encapsulates shared structure, so new nodes can be declared with minimal configuration.

**Requirements:**
- Create a `BaseNode` component accepting props: `id`, `label`, `inputs`, `outputs`, and `children`
- Automatically render `Handle` components based on `inputs`/`outputs` config arrays
- Rebuild all four existing nodes using `BaseNode`
- Create **5 new custom nodes** using `BaseNode` to demonstrate abstraction efficiency

**Suggested New Nodes:**

| Node Name       | Purpose                                    |
|-----------------|--------------------------------------------|
| `NoteNode`      | Static markdown/text annotation on canvas  |
| `FilterNode`    | Conditional logic gate (if/else)           |
| `TransformNode` | Data transformation / format converter     |
| `APINode`       | External HTTP API call configuration       |
| `MergeNode`     | Combine multiple inputs into one output    |

---

### Part 2 — UI / Styling

**Goal:** Transform the bare-bones UI into a professional, visually coherent application.

**Requirements:**
- Consistent color palette, typography, and spacing across all components
- Styled toolbar with clearly labeled, draggable node chips
- Styled canvas with visible grid, smooth edges, and minimap
- Styled nodes: rounded corners, header accent color, clean handle dots
- Responsive layout with a fixed toolbar and full-height canvas
- Submit button styled prominently at the bottom of the page

**Reference:** VectorShift's existing UI at [vectorshift.ai](https://vectorshift.ai) can be used as inspiration.

---

### Part 3 — Text Node Enhancements

**Goal:** Make the Text node smarter with auto-resizing and dynamic variable detection.

#### 3a. Auto-Resize
- The node's **width and height grow** automatically as the user types more text
- Use a `<textarea>` instead of `<input>` to support multi-line input
- Derive dimensions from `textarea`'s `scrollHeight` / content length using `useEffect` or `onChange`

#### 3b. Dynamic Variable Handles
- When the user types a valid JS variable name wrapped in `{{ }}` (e.g., `{{ myVar }}`), a new **left-side `Handle`** is dynamically added to the node
- Variables are extracted using regex: `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`
- Handles are deduplicated — the same variable name only produces one handle
- Handles are removed when the variable is deleted from the text
- Each variable handle is labeled with the variable name

**Example:**

```
Text input:  "Summarize {{ topic }} for {{ audience }}"
Result:      Two left-side handles labeled "topic" and "audience"
```

---

### Part 4 — Backend Integration

#### Frontend (`submit.js`)
- On button click, read `nodes` and `edges` from Zustand store
- Send a `POST` request to `http://localhost:8000/pipelines/parse`
- Payload format:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

- On response, display a browser `alert` (or modal) showing:
  - Number of nodes
  - Number of edges
  - Whether the pipeline is a DAG

#### Backend (`main.py`)
- Update the `/pipelines/parse` endpoint to accept `POST` with JSON body
- Calculate `num_nodes` and `num_edges`
- Run DAG detection using depth-first search to check for cycles
- Return response in the required format:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

---

## Implementation Plan

### Step 1 — BaseNode Abstraction
```
src/nodes/BaseNode.js        ← new reusable component
src/nodes/inputNode.js       ← refactor to use BaseNode
src/nodes/outputNode.js      ← refactor to use BaseNode
src/nodes/llmNode.js         ← refactor to use BaseNode
src/nodes/textNode.js        ← refactor to use BaseNode
src/nodes/noteNode.js        ← new
src/nodes/filterNode.js      ← new
src/nodes/transformNode.js   ← new
src/nodes/apiNode.js         ← new
src/nodes/mergeNode.js       ← new
```

`BaseNode` accepts:
```js
<BaseNode
  id={id}
  label="LLM"
  inputs={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]}
  outputs={[{ id: 'response', label: 'Response' }]}
>
  {/* optional node-specific content */}
</BaseNode>
```

---

### Step 2 — Styling Pass
- Choose a styling approach (Tailwind, CSS Modules, or `styled-components`)
- Define a design token file: colors, spacing, border-radius, shadows
- Style all existing components: `toolbar.js`, `ui.js`, `submit.js`, `draggableNode.js`
- Apply node-type-specific accent colors via `BaseNode`'s `color` prop

---

### Step 3 — Text Node Logic
```js
// 1. Extract variables using regex
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) vars.add(match[1]);
  return [...vars];
};

// 2. Resize node based on textarea content
useEffect(() => {
  setNodeSize({
    width: Math.max(200, currText.length * 8),
    height: Math.max(100, textareaRef.current?.scrollHeight + 60),
  });
}, [currText]);
```

---

### Step 4 — Backend Integration

**Frontend (`submit.js`):**
```js
const { nodes, edges } = useStore();

const handleSubmit = async () => {
  const res = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  const data = await res.json();
  alert(`Nodes: ${data.num_nodes} | Edges: ${data.num_edges} | Is DAG: ${data.is_dag}`);
};
```

**Backend (`main.py`):**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]

def is_dag(nodes, edges):
    graph = {n['id']: [] for n in nodes}
    for e in edges:
        graph[e['source']].append(e['target'])
    visited, rec_stack = set(), set()
    def dfs(node):
        visited.add(node); rec_stack.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if not dfs(neighbor): return False
            elif neighbor in rec_stack:
                return False
        rec_stack.remove(node)
        return True
    return all(dfs(n) for n in graph if n not in visited)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_dag(pipeline.nodes, pipeline.edges),
    }
```

---

## Folder Structure

```
vectorshift-assessment/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js          # ← Reusable node abstraction
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js
│   │   │   ├── noteNode.js          # ← New nodes (5)
│   │   │   ├── filterNode.js
│   │   │   ├── transformNode.js
│   │   │   ├── apiNode.js
│   │   │   └── mergeNode.js
│   │   ├── styles/
│   │   │   └── tokens.css           # Design tokens (colors, spacing)
│   │   ├── App.js
│   │   ├── ui.js                    # ReactFlow canvas
│   │   ├── toolbar.js               # Node palette / sidebar
│   │   ├── draggableNode.js
│   │   ├── submit.js                # Submit button + API call
│   │   ├── store.js                 # Zustand global state
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── main.py                      # FastAPI app + /pipelines/parse
    └── requirements.txt
```

---

## Key Concepts

### Component Abstraction
`BaseNode` uses a **render props / config-driven** pattern. Nodes are defined as data configs, not full components — drastically reducing code duplication.

### State Management
Zustand is used as a lightweight global store. `nodes`, `edges`, and helper actions (`addNode`, `onConnect`, etc.) are accessed via `useStore` with selector-based subscriptions to avoid unnecessary re-renders.

### Regex-Based Variable Parsing
Variables in the Text node are parsed using:
```
/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
```
This captures any valid JavaScript identifier inside double curly braces. A `Set` is used to deduplicate handles.

### DAG Detection
Backend uses iterative **Depth-First Search (DFS)** with a recursion stack to detect back edges — the standard algorithm for cycle detection in directed graphs. If any cycle exists, `is_dag` returns `false`.

---

## API Contract

### `POST /pipelines/parse`

**Request Body:**
```json
{
  "nodes": [
    { "id": "customInput-1", "type": "customInput", "position": { "x": 100, "y": 200 }, "data": {} },
    { "id": "llm-1", "type": "llm", "position": { "x": 400, "y": 200 }, "data": {} }
  ],
  "edges": [
    { "id": "e1", "source": "customInput-1", "target": "llm-1" }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

**Error Response (invalid payload):**
```json
{
  "detail": "Validation error: ..."
}
```

---

## How to Run

### Frontend

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
# Runs on http://localhost:8000
```

> **Note:** Ensure CORS is configured on the backend to allow requests from `http://localhost:3000`.

---

## Future Improvements

| Area | Improvement |
|------|-------------|
| **Persistence** | Save/load pipelines to `localStorage` or a database |
| **Node Config Panel** | Side panel for editing node properties without inline forms |
| **Validation UX** | Inline error indicators on nodes/edges instead of a plain `alert` |
| **Undo / Redo** | History stack via Zustand middleware |
| **Export** | Export pipeline as JSON or image |
| **Node Search** | Searchable toolbar for large node libraries |
| **Backend Auth** | JWT-based auth to secure the `/pipelines/parse` endpoint |
| **Test Coverage** | Unit tests for DAG detection and `BaseNode` rendering |
