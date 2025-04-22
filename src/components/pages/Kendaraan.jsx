import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../Navbar';
import './Kendaraan.css';
import Footer from '../Footer';

const Kendaraan = () => {
  const [kendaraan, setKendaraan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://probne.rikpetik.site/api/v1/kendaraan')
      .then((res) => res.json())
      .then((data) => setKendaraan(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSewa = () => {
    navigate(`/peminjaman`);
  };

  return (
    <>
      <MyNavbar />
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Temukan Mobil Impianmu</h1>
            <p>Pilihan terbaik untuk kebutuhan transportasi Anda</p>
          </div>
        </div>
      </section>

      <section className="kendaraan-section">
        <div className="kendaraan-container">
          <div className="kendaraan-header">
            <h2>Mobil Populer</h2>
            <p>Berbagai pilihan mobil yang paling diminati saat ini</p>
          </div>

          <div className="kendaraan-grid">
            {kendaraan.length === 0 ? (
              <p className="text-center">Loading...</p>
            ) : (
              kendaraan.map((item) => (
                <div key={item.id} className="kendaraan-card">
                  <img src={item.foto_kendaraan} alt={item.nama} className="kendaraan-image" />
                  <div className="kendaraan-content">
                    <h3>{item.nama}</h3>
                    <p className="jenis">Jenis: {item.jenis}</p>
                    <p className="plat">Plat: {item.nomor_plat}</p>
                    <button onClick={() => handleSewa(item.id)} className="btn-sewa">
                      Sewa Sekarang
                    </button>
                  </div>
                </div>
  
              ))
            )}

          </div>

        </div>

      </section>
      <section className="footer-section">
        <Footer />
      </section>
    </>
  );
};

export default Kendaraan;