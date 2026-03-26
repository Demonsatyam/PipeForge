import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode id={id} label="Note" style={{ background: '#fff9c4' }}>
      <div style={{ padding: '8px' }}>
        <span>This is a note.</span>
      </div>
    </BaseNode>
  );
};
