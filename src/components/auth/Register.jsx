import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Untuk konfirmasi password
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Menambahkan state loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    setLoading(true); // Menandakan bahwa registrasi sedang diproses

    try {
      const res = await axios.post('https://probne.rikpetik.site/api/v1/auth/register', formData);
      alert('Registrasi berhasil!');
      navigate('/login');  // Arahkan ke halaman login setelah registrasi berhasil
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);  // Menampilkan pesan error dari API jika ada
      } else {
        setError('Registrasi gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false); // Set loading ke false setelah proses selesai
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="register-container">
        <div className="register-card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="register-form">
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

            <label>Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi password"
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Loading...' : 'Daftar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
