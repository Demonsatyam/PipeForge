// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    undo: state.undo,
    redo: state.redo,
    past: state.past,
    future: state.future
});

export const PipelineToolbar = () => {
    const { undo, redo, past, future } = useStore(selector, shallow);

    return (
        <div style={{ 
            padding: '16px 24px', 
            background: 'var(--panel-bg)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={undo} 
                  disabled={!past || past.length === 0}
                  style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: past && past.length > 0 ? 'var(--primary-main)' : 'var(--node-bg)',
                      color: past && past.length > 0 ? '#fff' : 'var(--text-desc)',
                      border: 'none',
                      cursor: past && past.length > 0 ? 'pointer' : 'not-allowed',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                  }}>
                  Undo
                </button>
                <button 
                  onClick={redo} 
                  disabled={!future || future.length === 0}
                  style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: future && future.length > 0 ? 'var(--primary-main)' : 'var(--node-bg)',
                      color: future && future.length > 0 ? '#fff' : 'var(--text-desc)',
                      border: 'none',
                      cursor: future && future.length > 0 ? 'pointer' : 'not-allowed',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                  }}>
                  Redo
                </button>
            </div>
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
            <div style={{ width: '150px' }}></div> {/* Spacer for centering nodes */}
        </div>
    );
};
