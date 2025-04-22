import React from 'react';
import './Card.css'; // untuk styling CSS tambahan

const cardData = [
  {
    icon: '💠',
    title: 'Service Kendaraan',
    description: 'Kami menyediakan berbagai jenis layanan perawatan kendaraan.',
  },
  {
    icon: '🚗',
    title: 'Pinjam Mobil',
    description: 'Peminjaman mobil gratis dan mudah untuk berbagai keperluan.',
  },
  {
    icon: '🏍️',
    title: 'Pengembalian',
    description: 'Proses pengembalian kendaraan yang mudah dan cepat.'// yang berwarna biru solid
  },
];

const CardSection = () => {
  return (
    <div className="container py-5 d-flex justify-content-center gap-4 flex-wrap">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`card-box p-4 text-center shadow ${
            card.highlight ? 'card-highlight' : ''
          }`}
        >
          <div className="icon mb-3 fs-1">{card.icon}</div>
          <h5 className="fw-bold">{card.title}</h5>
          <p>{card.description}</p>
          <button className="btn btn-primary mt-2">READ MORE</button>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
