import React from 'react';
import './Preview.css';
import MyNavbar from './Navbar';
import Footer from './Footer';

const Preview = () => {
  return (
    <>
      <MyNavbar />
      <div className="preview-container">
        <div className="promo-section">
          <h1 className="promo-title">Selamat Datang di <span>AutoRent</span></h1>
          <p className="promo-text">
            Temukan kemudahan dalam menyewa kendaraan bersama AutoRent. Kami menyediakan berbagai jenis mobil 
            dan motor dengan kualitas terbaik, harga terjangkau, dan proses yang cepat. Cocok untuk kebutuhan harian, bisnis, atau perjalanan liburanmu.
          </p>
        </div>

        <div className="video-section">
          <h2 className="preview-title" style={{textAlign: "center"}}>Mobile Sang Owner</h2>
          <div className="video-wrapper">
            <iframe
              className="video-iframe"
              src="https://www.youtube.com/embed/fdS1ZQ7WJMk?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <br />

      {/* Section baru setelah video */}
      <section className="features-section">
        <h2 className="features-title" style={{textAlign: "center"}}>Kenapa Memilih AutoRent?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🚗 Unit Terawat</h3>
            <p>Kendaraan kami dicek rutin agar aman dan nyaman dipakai kapan saja.</p>
          </div>
          <div className="feature-card">
            <h3>💸 Harga Terjangkau</h3>
            <p>Tersedia berbagai pilihan harga sesuai dengan kebutuhan dan budget Anda.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Proses Cepat</h3>
            <p>Booking mudah, cepat, tanpa ribet — semua bisa dilakukan secara online.</p>
          </div>
          <div className="feature-card">
            <h3>📍 Layanan Luas</h3>
            <p>Kami melayani di berbagai kota besar dan terus berkembang ke lebih banyak lokasi.</p>
          </div>
        </div>
<br />
        {/* Tambahan teks penutup di bawah card */}
        <p style={{ marginTop: "2rem", fontSize: "20px", color: "#666", maxWidth: "700px", marginInline: "auto", textAlign: "center" }}>
          AutoRent hadir untuk membuat perjalanan Anda lebih mudah, nyaman, dan bebas repot. Dengan pilihan kendaraan lengkap dan layanan pelanggan terbaik, Anda tidak perlu bingung lagi saat butuh kendaraan kapan saja. Yuk, nikmati pengalaman rental yang berbeda bersama AutoRent!
        </p>
      </section>
      <Footer/>
    </>
  );
};

export default Preview;
