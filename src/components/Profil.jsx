import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import ikon panah
import './Profil.css';

const Profil = () => {
  const [profile, setProfile] = useState({
    nama: '',
    username: '',
    status: '',
    foto_profile: null,
  });

  const [preview, setPreview] = useState(null);
  const userId = 6;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`https://probne.rikpetik.site/api/v1/profile/${userId}`);
      const data = response.data?.data || response.data;

      setProfile({
        nama: data.nama || '',
        username: data.username || '',
        status: data.status || '',
        foto_profile: null,
      });

      setPreview(data.foto_profile || null);
      localStorage.setItem('profile', JSON.stringify(data));
    } catch (error) {
      console.error('Gagal ambil profil:', error);
    }
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile({
        nama: profileData.nama || '',
        username: profileData.username || '',
        status: profileData.status || '',
        foto_profile: null,
      });
      setPreview(profileData.foto_profile || null);
    } else {
      fetchProfile();
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, foto_profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nama', profile.nama);
      formData.append('username', profile.username);
      formData.append('status', profile.status);
      if (profile.foto_profile) {
        formData.append('foto_profile', profile.foto_profile);
      }

      await axios.put(`https://probne.rikpetik.site/api/v1/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Profil berhasil diupdate!');
      fetchProfile();
    } catch (error) {
      console.error('Gagal update profil:', error);
      alert('Terjadi kesalahan saat mengupdate profil.');
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <button className="btn-back" onClick={() => navigate(-1)} title="Kembali">
          <FaArrowLeft size={20} />
        </button>
        <h2>Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-left">
            <div className="profile-image">
              {preview ? (
                <img src={preview} alt="Foto Profil" />
              ) : (
                <div className="image-placeholder" />
              )}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <div className="profile-right">
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                name="nama"
                value={profile.nama}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={profile.status}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-update">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profil;
