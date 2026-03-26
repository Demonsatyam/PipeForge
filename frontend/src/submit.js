// submit.js

export const SubmitButton = () => {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button 
                type="submit"
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#fff',
                    background: 'var(--accent-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(138, 43, 226, 0.4)',
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
                Submit
            </button>
        </div>
    );
}
