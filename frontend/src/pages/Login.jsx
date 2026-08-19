import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try { 
      const data = await login(email, password); 
      if(data.user.role === 'admin') navigate('/admin'); else navigate('/dashboard');
    } catch (err) { 
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="glass-card text-center">
      <h2 className="title">Welcome Back</h2>
      <p className="subtitle">Sign in to access your dashboard</p>
      
      {error && <div className="error-msg">{error}</div>}
      
      <form onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email"
            className="form-input"
            placeholder="name@example.com" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input"
            placeholder="••••••••" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{marginTop: 10}}>Sign In</button>
      </form>
      <p style={{marginTop: 20, fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
        Don't have an account? <Link to="/register" className="link">Create account</Link>
      </p>
    </div>
  );
}
