import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="Filter"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
      ]}
    >
      <div><span>Condition Gate</span></div>
    </BaseNode>
  );
};
