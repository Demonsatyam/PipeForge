// draggableNode.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  getNodeID: state.getNodeID,
  addNode: state.addNode,
});

export const DraggableNode = ({ type, label }) => {
    const { getNodeID, addNode } = useStore(selector, shallow);

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onClick = () => {
      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        // Optional: calculate a better default position based on window size to place roughly in the center
        position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 },
        data: { id: nodeID, nodeType: `${type}` },
      };
      addNode(newNode);
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onClick={onClick}
        style={{ 
          cursor: 'grab', 
          minWidth: '90px', 
          padding: '8px 16px',
          height: '40px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--node-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }} 
        draggable
      >
          <span style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '500' }}>{label}</span>
      </div>
    );
  };