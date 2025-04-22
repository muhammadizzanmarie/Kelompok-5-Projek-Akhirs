import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Ikon panah
import './Histori.css';

const Histori = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`https://probne.rikpetik.site/api/v1/peminjaman/${id}`);
        setData(res.data);
      } catch (error) {
        console.error('Gagal mengambil data histori:', error);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!data) return <p>Memuat histori peminjaman...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        <FaArrowLeft style={{ marginRight: '8px' }} />
        Kembali ke Home
      </button>
      <h2>Histori Peminjaman</h2>
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <p><strong>Nama:</strong> {data.nama}</p>
        <p><strong>Alamat:</strong> {data.alamat}</p>
        <p><strong>No Telepon:</strong> {data.no_telepon}</p>
        <p><strong>Kendaraan:</strong> {data.kendaraan}</p>
        <p><strong>Bensin Awal:</strong> {data.bensin_awal}</p>
        <p><strong>Tanggal Peminjaman:</strong> {data.tanggal_peminjaman}</p>
        <div style={{ marginTop: '10px' }}>
          <p><strong>Foto KTP:</strong></p>
          <img src={data.foto_ktp} alt="Foto KTP" width={150} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <p><strong>Foto Wajah:</strong></p>
          <img src={data.foto_wajah} alt="Foto Wajah" width={150} />
        </div>
      </div>
    </div>
  );
};

export default Histori;
