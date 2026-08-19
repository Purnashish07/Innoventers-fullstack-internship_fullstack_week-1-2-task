import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try { 
      await register(form); 
      navigate('/dashboard'); 
    } catch (err) { 
      setError(err.response?.data?.msg || 'Registration failed. Please try again.'); 
    }
  };

  return (
    <div className="glass-card text-center">
      <h2 className="title">Create Account</h2>
      <p className="subtitle">Join us to access the dashboard</p>
      
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            type="text"
            className="form-input"
            placeholder="John Doe" 
            value={form.name} 
            onChange={e=>setForm({...form, name:e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email"
            className="form-input"
            placeholder="name@example.com" 
            value={form.email} 
            onChange={e=>setForm({...form, email:e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="••••••••" 
            value={form.password} 
            onChange={e=>setForm({...form, password:e.target.value})} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <select 
            className="select-input"
            value={form.role} 
            onChange={e=>setForm({...form, role:e.target.value})}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{marginTop: 10}}>Register</button>
      </form>
      <p style={{marginTop: 20, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
        Already have an account? <Link to="/login" className="link">Login here</Link>
      </p>
    </div>
  );
}
