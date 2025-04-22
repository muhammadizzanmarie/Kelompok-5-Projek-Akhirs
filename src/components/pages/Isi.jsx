import React, { useState } from 'react';
import './Isi.css';
import { FaCar, FaTools, FaCheckCircle, FaUndo } from 'react-icons/fa';

const Isi = () => {
  const [active, setActive] = useState('form');

  const handleClick = (type) => {
    setActive(type);
  };


  const renderContent = () => {
    switch (active) {
      case 'form':
        return {
          image: 'img/service-1.jpg',
          title: 'Pengisian Data Diri',
          desc: 'Isi data pribadi Anda dengan benar untuk memulai proses peminjaman kendaraan.',
          points: ['Proses Cepat dan Mudah', 'Terverifikasi Admin', 'Dokumen Aman']
        };
      case 'approval':
        return {
          image: 'img/service-2.jpg',
          title: 'Proses Persetujuan',
          desc: 'Admin akan memverifikasi data Anda dan menyetujui atau menolak pengajuan.',
          points: ['Cepat Diproses', 'Transparan', 'Dipantau oleh Admin']
        };
      case 'result':
        return {
          image: 'img/service-3.jpg',
          title: 'Diterima / Tolak',
          desc: 'Anda akan mendapatkan notifikasi apakah pengajuan diterima atau ditolak.',
          points: ['Langsung Diberi Info', 'Alasan Jelas', 'Bisa Ajukan Ulang']
        };
      case 'return':
        return {
          image: 'img/service-4.jpg',
          title: 'Pengembalian',
          desc: 'Kembalikan kendaraan sesuai kesepakatan dan upload foto kondisi kendaraan.',
          points: ['Prosedur Mudah', 'Foto Otomatis Terunggah', 'Riwayat Tersimpan']
        };
      default:
        return {};
    }
  };

  const content = renderContent();

  return (
    <div className="isi-container">
      <p className="isi-subtitle">// OUR SERVICES //</p>
      <h2 className="isi-title" style={{textAlign : "center"}}>Explore Our Services</h2>
      <br />
      <div className="isi-flexbox">
        <div className="isi-buttons">
          <button onClick={() => handleClick('form')} className="isi-button"><FaCar /> Pengisian Data Diri</button>
          <button onClick={() => handleClick('approval')} className="isi-button"><FaTools /> Proses Persetujuan</button>
          <button onClick={() => handleClick('result')} className="isi-button"><FaCheckCircle /> Diterima / Tolak</button>
          <button onClick={() => handleClick('return')} className="isi-button"><FaUndo /> Pengembalian</button>
        </div>
        <div className="isi-content-wrap">
          <img src={content.image} alt={content.title} className="isi-image" />
          <div className="isi-content">
            <h3 className="isi-content-title">{content.title}</h3>
            <p className="isi-content-desc">{content.desc}</p>
            <ul className="isi-content-list">
              {content.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <button className="read-more-btn">Read More →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Isi;
