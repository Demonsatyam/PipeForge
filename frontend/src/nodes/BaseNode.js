// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, label, inputs = [], outputs = [], children, style }) => {
  return (
    <div style={{ 
      width: 'max-content',
      minWidth: 200, 
      height: 'auto', 
      minHeight: 80, 
      border: '1px solid var(--border-color)', 
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--node-bg)',
      boxShadow: 'var(--shadow-node)',
      display: 'flex',
      flexDirection: 'column',
      ...style 
    }}>
      {inputs.map((input, index) => (
        <Handle
          key={input.id || input}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id || input}`}
          style={{ top: `${(100 / (inputs.length + 1)) * (index + 1)}%`, background: '#555' }}
        />
      ))}

      <div style={{ 
        padding: '8px', 
        borderBottom: '1px solid var(--border-color)', 
        background: 'rgba(0,0,0,0.2)',
        borderTopLeftRadius: 'var(--radius-md)',
        borderTopRightRadius: 'var(--radius-md)',
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'var(--text-main)'
      }}>
        <span>{label}</span>
      </div>

      <div style={{ 
        padding: '12px 16px', 
        color: 'var(--text-muted)', 
        fontSize: '13px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px' 
      }}>
        {children}
      </div>

      {outputs.map((output, index) => (
        <Handle
          key={output.id || output}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id || output}`}
          style={{ top: `${(100 / (outputs.length + 1)) * (index + 1)}%`, background: '#555' }}
        />
      ))}
    </div>
  );
};
