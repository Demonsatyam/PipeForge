// textNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      label="Text"
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={(e) => setCurrText(e.target.value)} 
          />
        </label>
      </div>
    </BaseNode>
  );
}
