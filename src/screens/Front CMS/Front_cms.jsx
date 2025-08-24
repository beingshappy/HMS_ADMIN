import React, { useState } from 'react';
import { FaGlobe, FaEdit, FaTimes } from 'react-icons/fa';

const Front_CMF = ({ sidebarCollapsed }) => {
  const [homeImage, setHomeImage] = useState('/home-image.png');
  const [doctorImage, setDoctorImage] = useState('/doctor-image.png');
  const [homeExperience, setHomeExperience] = useState('5');
  const [homeTitle, setHomeTitle] = useState('Digital Hospital Management at one place');
  const [homeDescription, setHomeDescription] = useState('Next-Gen Hospital Solutions: Drive Innovation, Deliver Quality Healthcare');
  const [showModal, setShowModal] = useState(false);
  const [newCMS, setNewCMS] = useState({ title: '', description: '', experience: '', image: null });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'home') setHomeImage(reader.result);
      else setDoctorImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCMS = () => {
    if (!newCMS.title || !newCMS.description || !newCMS.experience || !newCMS.image) {
      alert('Please fill all fields and select an image!');
      return;
    }
    alert(`New CMS Added: ${newCMS.title}`);
    setNewCMS({ title: '', description: '', experience: '', image: null });
    setShowModal(false);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        marginTop: '20px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#f4f6f9',
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2>Front CMS</h2>
            <p>Manage homepage banners, about us, news, and more.</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ padding: '10px 15px', borderRadius: '8px', background: '#4e73df', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <FaGlobe style={{ marginRight: '5px' }} /> Add CMS Content
          </button>
        </div>

        {/* Image Upload Section */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={homeImage} alt="Home" style={{ width: '200px', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
              <FaEdit style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', color: '#fff', background: '#000a', borderRadius: '50%', padding: '5px' }} onClick={() => document.getElementById('homeFile').click()} />
            </div>
            <input id="homeFile" type="file" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'home')} />
            <p style={{ fontSize: '12px', color: '#555' }}>Allowed file types: png, jpg, jpeg.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img src={doctorImage} alt="Doctor" style={{ width: '200px', height: '150px', borderRadius: '8px', objectFit: 'cover' }} />
              <FaEdit style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', color: '#fff', background: '#000a', borderRadius: '50%', padding: '5px' }} onClick={() => document.getElementById('doctorFile').click()} />
            </div>
            <input id="doctorFile" type="file" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'doctor')} />
            <p style={{ fontSize: '12px', color: '#555' }}>Allowed file types: png, jpg, jpeg.</p>
          </div>
        </div>

        {/* Form Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
          <div>
            <label>Home Page Experience *</label>
            <input type="text" value={homeExperience} onChange={e => setHomeExperience(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label>Home Page Title *</label>
            <input type="text" value={homeTitle} onChange={e => setHomeTitle(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>

          <div>
            <label>Home Page Description *</label>
            <textarea rows="3" value={homeDescription} onChange={e => setHomeDescription(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
        </div>

        {/* Add CMS Modal */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex: 20 }}>
            <div style={{ background:'#fff', padding:'20px', borderRadius:'10px', width:'400px', position:'relative' }}>
              <FaTimes style={{ position:'absolute', top:'10px', right:'10px', cursor:'pointer' }} onClick={() => setShowModal(false)} />
              <h3 style={{ marginBottom:'10px' }}>Add CMS Content</h3>
              <input type="text" placeholder="Title" value={newCMS.title} onChange={e => setNewCMS({...newCMS, title:e.target.value})} style={{ width:'100%', marginBottom:'10px', padding:'8px', borderRadius:'5px', border:'1px solid #ccc' }} />
              <textarea placeholder="Description" value={newCMS.description} onChange={e => setNewCMS({...newCMS, description:e.target.value})} rows={3} style={{ width:'100%', marginBottom:'10px', padding:'8px', borderRadius:'5px', border:'1px solid #ccc' }} />
              <input type="text" placeholder="Experience" value={newCMS.experience} onChange={e => setNewCMS({...newCMS, experience:e.target.value})} style={{ width:'100%', marginBottom:'10px', padding:'8px', borderRadius:'5px', border:'1px solid #ccc' }} />
              <input type="file" onChange={e => setNewCMS({...newCMS, image:e.target.files[0]})} style={{ marginBottom:'10px' }} />
              <button onClick={handleAddCMS} style={{ padding:'10px', width:'100%', borderRadius:'8px', background:'#4e73df', color:'#fff', border:'none', cursor:'pointer' }}>Add CMS</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Front_CMF;
