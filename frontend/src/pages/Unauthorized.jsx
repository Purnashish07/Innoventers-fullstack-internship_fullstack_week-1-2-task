import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Unauthorized() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  // Auto-redirect back to dashboard after 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="glass-card text-center">
      {/* 403 Icon */}
      <div style={{
        fontSize: '4rem',
        marginBottom: '16px',
        filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.5))'
      }}>
        🚫
      </div>

      <h2 className="title" style={{
        background: 'linear-gradient(to right, #ef4444, #f97316)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        403
      </h2>

      <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f8fafc', marginBottom: 8 }}>
        Access Forbidden
      </p>

      <p className="subtitle">
        You don't have permission to access this page.
        {user && (
          <span> Your current role is <strong style={{ color: '#f97316' }}>"{user.role}"</strong>.</span>
        )}
      </p>

      {/* Divider */}
      <div style={{ margin: '24px 0', borderTop: '1px solid var(--border-color)' }} />

      {/* Redirect info */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 8,
        padding: '16px',
        marginBottom: 24,
      }}>
        <p style={{ color: '#fca5a5', fontSize: '0.9rem' }}>
          Redirecting to your dashboard in <strong style={{ color: '#ef4444', fontSize: '1.1rem' }}>{countdown}</strong>s...
        </p>
        {/* Countdown progress bar */}
        <div style={{
          marginTop: 10,
          height: 4,
          background: 'rgba(239,68,68,0.2)',
          borderRadius: 9999,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${(countdown / 3) * 100}%`,
            background: '#ef4444',
            borderRadius: 9999,
            transition: 'width 1s linear'
          }} />
        </div>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="btn btn-primary"
        style={{ background: 'linear-gradient(to right, #ef4444, #f97316)', border: 'none' }}
      >
        Go to Dashboard Now
      </button>
    </div>
  );
}
