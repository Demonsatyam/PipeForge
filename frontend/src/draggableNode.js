// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
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
  