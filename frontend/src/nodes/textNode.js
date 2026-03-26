// textNode.js

import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });
  const textareaRef = useRef(null);

  useEffect(() => {
    // 1. Extract variables dynamically
    const extractVariables = (text) => {
      const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
      const vars = new Set();
      let match;
      while ((match = regex.exec(text)) !== null) vars.add(match[1]);
      return [...vars];
    };
    
    setVariables(extractVariables(currText));

    // 2. Adjust size
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset to get correct shrinking measurement
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
      
      setNodeSize({
        width: Math.max(200, 200 + (Math.floor(currText.length / 30) * 10)),
        height: Math.max(80, scrollHeight + 60),
      });
    }
  }, [currText]);

  // Combine hardcoded inputs/outputs with dynamic variable inputs
  const dynamicInputs = variables.map((v) => ({ id: v, label: v }));

  return (
    <BaseNode
      id={id}
      label="Text"
      inputs={dynamicInputs}
      outputs={[{ id: 'output', label: 'Output' }]}
      style={{ width: `${nodeSize.width}px`, minHeight: `${nodeSize.height}px` }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            style={{
              width: '100%',
              resize: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box',
              marginTop: '4px',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
