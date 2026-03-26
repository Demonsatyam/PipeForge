import { BaseNode } from './BaseNode';

export const TransformNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="Transform"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <div><span>Data Converter</span></div>
    </BaseNode>
  );
};
