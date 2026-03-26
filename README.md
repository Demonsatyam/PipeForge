# PipeForge

A visual pipeline builder for creating and managing data processing workflows using a drag-and-drop interface.

## About the Project

PipeForge is a full-stack web application that allows users to visually design data pipelines using a node-based editor. Built with React and FastAPI, it provides an intuitive interface for creating, editing, and validating pipeline workflows.

### Key Features

- **Visual Pipeline Editor**: Drag-and-drop node-based interface built with ReactFlow
- **Multiple Node Types**: Including input, output, LLM, API, filter, merge, transform, and text nodes
- **DAG Validation**: Backend validation ensures pipelines are valid Directed Acyclic Graphs
- **Undo/Redo Support**: Full history management for pipeline edits
- **Click-to-Add**: Quickly add nodes by clicking on the canvas
- **Real-time Preview**: See your pipeline structure as you build it

## Project Structure

```
PipeForge/
├── backend/
│   ├── main.py              # FastAPI server with DAG validation
│   └── test_post.py         # Test script for API endpoints
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main application component
│   │   ├── store.js         # Zustand state management with undo/redo
│   │   ├── ui.js            # Pipeline UI component
│   │   ├── toolbar.js       # Node selection toolbar
│   │   ├── submit.js        # Pipeline submission component
│   │   └── nodes/           # Custom node components
│   │       ├── BaseNode.js
│   │       ├── inputNode.js
│   │       ├── outputNode.js
│   │       ├── llmNode.js
│   │       ├── apiNode.js
│   │       ├── filterNode.js
│   │       ├── mergeNode.js
│   │       ├── transformNode.js
│   │       └── textNode.js
│   └── public/              # Static assets
└── README.md
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **ReactFlow** - Node-based graph editor
- **Zustand** - State management
- **Create React App** - Build tooling

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation

## Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** (comes with Node.js)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PipeForge
```

### 2. Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn pydantic requests
```

### 3. Set Up Frontend

```bash
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd backend
source venv/bin/activate  # If not already activated
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check (returns `{"Ping": "Pong"}`) |
| POST | `/pipelines/parse` | Validate a pipeline and return node/edge count and DAG status |

### Example API Request

```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      { "id": "input-1", "type": "customInput" },
      { "id": "llm-1", "type": "llm" }
    ],
    "edges": [
      { "id": "e1", "source": "input-1", "target": "llm-1" }
    ]
  }'
```

### Example Response

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Testing

### Backend Tests

```bash
cd backend
python test_post.py
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `build/` directory.

### Backend

```bash
cd backend
# No build step required, just ensure dependencies are installed
pip install -r requirements.txt  # If you have a requirements file
```

## Usage

1. **Add Nodes**: Click on a node type in the toolbar, then click on the canvas to place it
2. **Connect Nodes**: Drag from an output handle to an input handle to create a connection
3. **Move Nodes**: Drag nodes to reposition them
4. **Edit Node Data**: Click on a node to edit its properties
5. **Undo/Redo**: Use Ctrl+Z / Ctrl+Shift+Z to undo/redo changes
6. **Submit Pipeline**: Click the submit button to validate and send your pipeline to the backend

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
