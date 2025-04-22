import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://probne.rikpetik.site/api/v1/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);  // Simpan token di localStorage

      // Jika email adalah izzan@gmail.com dan password izzanganteng, arahkan ke dashboard
      if (formData.email === 'izzan@gmail.com' && formData.password === 'izzanganteng') {
        alert('Login berhasil sebagai Admin!');
        navigate('/dashboard/dashboard');  // Arahkan ke halaman dashboard jika admin
      } else {
        alert('Login berhasil!');
        navigate('/');  // Arahkan ke halaman home jika user lain
      }

    } catch (err) {
      console.error(err);
      setError('Login gagal. Periksa email dan password.');
    }
  };

  return (
    <>
    <MyNavbar />
    <div className="login-container"> 
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Masuk</button>
        </form>

        <div className="signup-link">
          <p>Belum punya akun? <a href="/register">Daftar di sini</a></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
