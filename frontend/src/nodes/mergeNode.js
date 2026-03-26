import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="Merge"
      inputs={[{ id: 'in1', label: 'In 1' }, { id: 'in2', label: 'In 2' }]}
      outputs={[{ id: 'out', label: 'Out' }]}
    >
      <div><span>Combine Data</span></div>
    </BaseNode>
  );
};
