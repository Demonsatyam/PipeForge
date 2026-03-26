// submit.js
import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await response.json();
            alert(`Pipeline Analysis:\n\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Failed to submit pipeline to backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                    background: isLoading ? 'var(--border-color)' : 'var(--accent-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: isLoading ? 'none' : '0 4px 12px rgba(138, 43, 226, 0.4)',
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
            >
                {isLoading ? 'Analyzing...' : 'Submit'}
            </button>
        </div>
    );
}
