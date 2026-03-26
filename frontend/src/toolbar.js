// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '16px 24px', 
            background: 'var(--panel-bg)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
