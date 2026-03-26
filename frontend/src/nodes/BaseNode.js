// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, label, inputs = [], outputs = [], children, style }) => {
  return (
    <div style={{ width: 200, height: 'auto', minHeight: 80, border: '1px solid black', paddingBottom: 10, ...style }}>
      {/* Target Handles (Left) */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id || input}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id || input}`}
          style={{ top: `${(100 / (inputs.length + 1)) * (index + 1)}%` }}
        />
      ))}

      {/* Node Header */}
      <div>
        <span>{label}</span>
      </div>

      {/* Node Content */}
      <div style={{ padding: '4px 8px' }}>
        {children}
      </div>

      {/* Source Handles (Right) */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id || output}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id || output}`}
          style={{ top: `${(100 / (outputs.length + 1)) * (index + 1)}%` }}
        />
      ))}
    </div>
  );
};
