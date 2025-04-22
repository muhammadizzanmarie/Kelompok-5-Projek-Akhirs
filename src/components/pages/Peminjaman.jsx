import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../Navbar';

const FormPeminjaman = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: '7',
    nama: '',
    alamat: '',
    no_telepon: '',
    instansi: '',
    kendaraan: '',
    kondisi_kendaraan: '',
    bensin_awal: '',
    sisa_etol: '',
    tanggal_peminjaman: '',
    foto_ktp: null,
    foto_wajah: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      // Validasi untuk foto KTP
      if (name === 'foto_ktp') {
        const isImage = file.type.startsWith('image/');
        const maxSizeMB = 2;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (!isImage) {
          alert('File KTP harus berupa gambar.');
          e.target.value = null;
          return;
        }

        if (file.size > maxSizeBytes) {
          alert(`Ukuran gambar maksimal ${maxSizeMB}MB.`);
          e.target.value = null;
          return;
        }

        // Validasi dasar: nama file mengandung "ktp"
        const nameContainsKTP = file.name.toLowerCase().includes('ktp');
        if (!nameContainsKTP) {
          const confirmUpload = window.confirm(
            'Nama file tidak mengandung kata "ktp". Apakah Anda yakin file ini adalah foto KTP asli?'
          );
          if (!confirmUpload) {
            e.target.value = null;
            return;
          }
        }
      }

      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        'https://probne.rikpetik.site/api/v1/peminjaman/create',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const createdId = res.data?.peminjaman?.id;
      if (createdId) {
        navigate('/loading', { state: { id: createdId } });
      } else {
        alert('Gagal mendapatkan ID peminjaman.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  const style = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '24px',
      background: '#f5f5f5',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif',
    },
    label: {
      display: 'block',
      marginTop: '12px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginTop: '6px',
      marginBottom: '12px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '16px',
    },
  };

  return (
    <>
      <MyNavbar />
      <div style={style.container}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Form Peminjaman</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label style={style.label}>Nama:</label>
          <input type="text" name="nama" onChange={handleChange} style={style.input} required />

          <label style={style.label}>Alamat:</label>
          <input type="text" name="alamat" onChange={handleChange} style={style.input} required />

          <label style={style.label}>No Telepon:</label>
          <input type="text" name="no_telepon" onChange={handleChange} style={style.input} required />

          <label style={style.label}>Instansi:</label>
          <input type="text" name="instansi" onChange={handleChange} style={style.input} />

          <label style={style.label}>Kendaraan:</label>
          <select name="kendaraan" onChange={handleChange} style={style.input} required>
            <option value="">Pilih Kendaraan</option>
            <option value="mobil">Mobil</option>
            <option value="motor">Motor</option>
          </select>

          <label style={style.label}>Kondisi Kendaraan:</label>
          <input type="text" name="kondisi_kendaraan" onChange={handleChange} style={style.input} />

          <label style={style.label}>Bensin Awal (liter):</label>
          <input type="number" name="bensin_awal" onChange={handleChange} style={style.input} />

          <label style={style.label}>Sisa E-toll (Rp):</label>
          <input type="number" name="sisa_etol" onChange={handleChange} style={style.input} />

          <label style={style.label}>Tanggal Peminjaman:</label>
          <input type="date" name="tanggal_peminjaman" onChange={handleChange} style={style.input} required />

          <label style={style.label}>Foto KTP:</label>
          <input type="file" name="foto_ktp" onChange={handleChange} accept="image/*" style={style.input} required />

          <label style={style.label}>Foto Wajah:</label>
          <input type="file" name="foto_wajah" onChange={handleChange} accept="image/*" style={style.input} required />

          <button type="submit" style={style.button}>Kirim Peminjaman</button>
        </form>
      </div>
    </>
  );
};

export default FormPeminjaman;
