// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' }
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
