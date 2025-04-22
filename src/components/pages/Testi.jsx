import React from 'react';
import './Testi.css';

const testimonials = [
  { img: '/img/client1.png', name: 'Reza Febrian', profession: 'DPR', message: 'Great service and clean cars! Zikri' },
  { img: '/img/client2.png', name: 'Faturrahman', profession: 'President', message: 'Easy booking and friendly staff. The Owner Is Baik' },
  { img: '/img/client3.png', name: 'Rahmat Dani', profession: 'KPK', message: 'Affordable and fast process. Oman' }
];

const Testi = () => {
  return (
    <section className="testi-section">
      <p className="subtitle">// TESTIMONIAL //</p>
      <h2 className="section-title" style={{textAlign : "center"}}>What Our Clients Say</h2>

      <div className="testi-list">
        {testimonials.map((t, i) => (
          <div className="testimonial-box" key={i}>
            <img src={t.img} alt={t.name} className="testimonial-img" />
            <h4 className="testimonial-name">{t.name}</h4>
            <p className="testimonial-role">{t.profession}</p>
            <p className="testimonial-message">"{t.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testi;
