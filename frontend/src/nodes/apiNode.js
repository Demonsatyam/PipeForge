import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="API Request"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'data', label: 'Data' }, { id: 'error', label: 'Error' }]}
    >
      <div><span>GET /api/data</span></div>
    </BaseNode>
  );
};
