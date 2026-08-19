import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [msg, setMsg] = useState('');
  
  useEffect(() => { 
    API.get('/auth/admin-dashboard')
      .then(r => setMsg(r.data.msg))
      .catch(e => setMsg(e.response?.data?.msg || 'Not authorized')) 
  }, []);
  
  return (
    <div className="glass-card wide">
      <div className="dashboard-header">
        <div>
          <h2 className="title" style={{fontSize: '1.5rem', marginBottom: 0, background: 'linear-gradient(to right, #c084fc, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Admin Dashboard</h2>
          <div style={{marginTop: 8}}>
            <span>Welcome back, {user?.name}</span>
            <span className="badge admin">Role: {user?.role}</span>
          </div>
        </div>
        <button onClick={logout} className="btn btn-danger">Logout</button>
      </div>
      
      <div className="dashboard-content" style={{border: '1px dashed rgba(168, 85, 247, 0.4)'}}>
        <h3 style={{color: '#e879f9'}}>Admin Overview</h3>
        <p>This is an admin-only protected route. Standard users cannot see this.</p>
        <div style={{marginTop: 20, padding: 15, background: 'rgba(168, 85, 247, 0.1)', borderRadius: 8, borderLeft: '4px solid #a855f7'}}>
          <strong>Server Message:</strong> {msg}
        </div>
      </div>
    </div>
  );
}
