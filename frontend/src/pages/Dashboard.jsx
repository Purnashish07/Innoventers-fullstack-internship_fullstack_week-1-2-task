import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  
  useEffect(() => { 
    API.get('/auth/user-dashboard')
      .then(r => setMsg(r.data.msg))
      .catch(() => setMsg('Failed to load dashboard data.')) 
  }, []);
  
  return (
    <div className="glass-card wide">
      <div className="dashboard-header">
        <div>
          <h2 className="title" style={{fontSize: '1.5rem', marginBottom: 0}}>User Dashboard</h2>
          <div style={{marginTop: 8}}>
            <span>Welcome back, {user?.name}</span>
            <span className="badge">Role: {user?.role}</span>
          </div>
        </div>
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </div>
      
      <div className="dashboard-content">
        <h3>Dashboard Overview</h3>
        <p>This is a protected route. Only authenticated users can see this content.</p>
        <div style={{marginTop: 20, padding: 15, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 8, borderLeft: '4px solid var(--primary-color)'}}>
          <strong>Server Message:</strong> {msg}
        </div>
      </div>
    </div>
  );
}
