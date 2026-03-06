import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Username atau password salah');
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary">Login Admin</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark mt-2">Silakan masuk untuk mengelola artikel</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-bold text-sm text-secondary">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Masukkan username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold text-sm text-secondary">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              placeholder="Masukkan password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-background-light py-3 rounded-lg font-bold transition-colors mt-2 disabled:opacity-70"
          >
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>
        </form>
      </div>
    </main>
  );
}
