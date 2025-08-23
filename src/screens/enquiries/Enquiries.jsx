import React, { useState } from 'react';
import { FaQuestionCircle, FaEye, FaFilter } from 'react-icons/fa';

// Initial Data
const initialEnquiries = [
  { name: 'Infyom', email: 'admin@vcard.com', type: 'General Enquiry', typeClass: 'tag-yellow', date: '6th May,2025', viewer: 'Infy HMS', status: true },
  { name: 'Lf', email: 'innove1962@gmail.com', type: 'Residential Care', typeClass: 'tag-green', date: '18th Apr,2025', viewer: 'Infy HMS', status: true },
  { name: 'L', email: 'innove1962@gmail.com', type: 'Feedback / Suggestions', typeClass: 'tag-purple', date: '18th Apr,2025', viewer: 'Infy HMS', status: true },
  { name: 'test', email: 'info@gmail.com', type: 'General Enquiry', typeClass: 'tag-yellow', date: '25th Sep,2024', viewer: 'Test User', status: true },
  { name: 'Johnny Appleseed', email: 'admin@hms.com', type: 'Residential Care', typeClass: 'tag-green', date: '1st Aug,2024', viewer: 'Infy HMS', status: true },
];

const Enquiries = ({ sidebarCollapsed }) => {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Filter & Search Logic
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === 'All' ? true : e.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Add Dummy Enquiry
  const addEnquiry = () => {
    const newEnquiry = {
      name: 'New User',
      email: 'newuser@mail.com',
      type: 'General Enquiry',
      typeClass: 'tag-yellow',
      date: '25th Aug,2025',
      viewer: 'Admin',
      status: true,
    };
    setEnquiries([newEnquiry, ...enquiries]);
  };

  // Toggle Status
  const toggleStatus = (index) => {
    const updated = [...enquiries];
    updated[index].status = !updated[index].status;
    setEnquiries(updated);
  };

  return (
    <div
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        transition: 'margin-left 0.3s',
        minHeight: '100vh',
        backgroundColor: '#f3f6fb',
      }}
    >
      <div style={{ padding: '0 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ color: '#2c3e50', fontWeight: 600, margin: 0 }}>Enquiries</h2>
            <p style={{ margin: 0, color: '#6c757d' }}>View and manage patient/public enquiries.</p>
          </div>
          <button
            onClick={addEnquiry}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              backgroundColor: '#4e73df',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <FaQuestionCircle style={{ marginRight: '8px' }} /> Add Enquiry
          </button>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', marginBottom: '10px', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="All">All Types</option>
            <option value="General Enquiry">General Enquiry</option>
            <option value="Residential Care">Residential Care</option>
            <option value="Feedback / Suggestions">Feedback / Suggestions</option>
          </select>
          <FaFilter style={{ alignSelf: 'center', fontSize: '20px', color: '#555' }} />
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead style={{ backgroundColor: '#e9ecef' }}>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>NAME</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>TYPE</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>CREATED ON</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>VIEWED BY</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>STATUS</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '10px' }}>
                  <div>
                    <strong>{row.name}</strong>
                    <div style={{ fontSize: '12px', color: '#6c757d' }}>{row.email}</div>
                  </div>
                </td>
                <td style={{ padding: '10px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: row.typeClass === 'tag-yellow' ? '#f6e05e' : row.typeClass === 'tag-green' ? '#38a169' : '#9f7aea',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  >
                    {row.type}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>{row.date}</td>
                <td style={{ padding: '10px' }}>{row.viewer}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                    <input
                      type="checkbox"
                      checked={row.status}
                      onChange={() => toggleStatus(idx)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: row.status ? '#4e73df' : '#ccc',
                        transition: '.4s',
                        borderRadius: '20px',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        left: row.status ? '20px' : '0px',
                        top: '0px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '.4s',
                      }}
                    />
                  </label>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <FaEye style={{ cursor: 'pointer', color: '#4e73df' }} />
                </td>
              </tr>
            ))}
            {filteredEnquiries.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '10px', textAlign: 'center' }}>
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;
