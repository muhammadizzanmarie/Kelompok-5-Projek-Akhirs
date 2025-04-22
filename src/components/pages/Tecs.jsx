import React from 'react';
import './Tecs.css'; // Import file CSS

const teamData = [
  {
    name: "Zikri maulana",
    designation: "Mekanik",
    image: "https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/133/2023/08/22/Profesi-mekanik-1789448704.jpg",
  },
  {
    name: " Oman Picisan",
    designation: "Ajudan",
    image: "https://www.astra-daihatsu.id/_next/image?url=https%3A%2F%2Fdsoodysseusstprod.blob.core.windows.net%2Fstrapi-media%2Fassets%2Fsys_master_media_he5_hdb_8814893301790_montir_20dan_20mekanik_ddd49b7ac2.jpg&w=3840&q=75",
  },
  {
    name: "Muhammad izzan Ganteng",
    designation: "Owner",
    image:"https://www.alphajwc.com/wp-content/uploads/2023/04/portrait-cheerful-attractive-handsome-businessman-holding-hands-with-confident-face-looking-camera-standing-grey-background.jpg",
  }
];

const Tecs = () => {
  return (
    <div className="tecs-section">
      <p className="subtitle">// OUR TECHNICIANS //</p>
      <h2 className="section-title" style={{textAlign : "center"}}>Owner dan lainnya</h2>

      <div className="card-container">
        {teamData.map((member, index) => (
          <div key={index} className="card">
            <img src={member.image} alt={member.name} className="card-img" />
            <div className="card-info">
              <h3 className="card-name">{member.name}</h3>
              <p className="card-role">{member.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tecs;
