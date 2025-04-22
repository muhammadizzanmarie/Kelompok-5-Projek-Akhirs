import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../Navbar';

const FormPengembalian = () => {
  const [formData, setFormData] = useState({
    user_id: '7',  // Set user_id langsung ke 7
    kondisi_kendaraan: '',
    bensin_akhir: '',
    sisa_etol: '',
    tanggal_pengembalian: '',
    keterangan: '',
    status: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.kondisi_kendaraan || !formData.bensin_akhir || !formData.sisa_etol || !formData.tanggal_pengembalian || !formData.keterangan || !formData.status) {
      setErrorMessage('Semua kolom harus diisi!');
      return;
    }

    if (isNaN(formData.bensin_akhir) || isNaN(formData.sisa_etol)) {
      setErrorMessage('Bensin Akhir dan Sisa E-toll harus berupa angka!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post(
        'https://probne.rikpetik.site/api/v1/pengembalian/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setLoading(false);
      alert('Pengembalian berhasil dikirim!');
      console.log(res.data);
      navigate('/loading');
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '24px',
    background: '#f5f5f5',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  };

  const labelStyle = {
    display: 'block',
    marginTop: '12px',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '6px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '12px',
  };

  return (
    <>
      <MyNavbar /> {/* Tambahkan Navbar */}
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Form Pengembalian</h2>

        {loading ? (
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            <p>Loading...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Hapus Peminjaman ID karena user_id langsung di-set ke 7 */}
            <label style={labelStyle}>Kondisi Kendaraan:</label>
            <input type="text" name="kondisi_kendaraan" value={formData.kondisi_kendaraan} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Bensin Akhir:</label>
            <input type="number" name="bensin_akhir" value={formData.bensin_akhir} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Sisa E-toll:</label>
            <input type="number" name="sisa_etol" value={formData.sisa_etol} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Tanggal Pengembalian:</label>
            <input type="date" name="tanggal_pengembalian" value={formData.tanggal_pengembalian} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Keterangan:</label>
            <textarea name="keterangan" value={formData.keterangan} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} required></textarea>

            <label style={labelStyle}>Status:</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle} required>
              <option value="">Pilih Status</option>
              <option value="diproses">Diproses</option>
              <option value="telah dikembalikan">Telah Dikembalikan</option>
            </select>

            <button type="submit" style={buttonStyle}>Kirim Pengembalian</button>

            {errorMessage && (
              <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default FormPengembalian;
