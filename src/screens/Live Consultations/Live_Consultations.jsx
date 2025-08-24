import React, { useState } from 'react';
import { FaVideo, FaTrash, FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const Live_Consultations = ({ sidebarCollapsed }) => {
  const [consultations, setConsultations] = useState([
    { id: 1, title: 'ghjghjg', date: '16th Oct,2023', time: '12:00 AM', createdBy: 'Bhautik Bhalala Doctor', status: 'Finished', password: '123456' },
    { id: 2, title: 'test demo', date: '20th Sep,2023', time: '12:00 AM', createdBy: 'Infy HMS', status: 'Cancelled', password: '123456' },
    { id: 3, title: 'as', date: '5th Apr,2023', time: '12:00 AM', createdBy: 'Harish Mohan', status: 'Cancelled', password: 'MKrq1K' },
    { id: 4, title: 'ff', date: '24th Mar,2023', time: '12:00 AM', createdBy: 'Harish Mohan', status: 'Finished', password: '6T7Pah' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newConsultation, setNewConsultation] = useState({ title: '', date: '', time: '', createdBy: '', status: 'Finished', password: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = consultations.filter(
    c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         c.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleDelete = id => setConsultations(consultations.filter(c => c.id !== id));
  const handleEdit = c => { setEditingId(c.id); setEditValues({ ...c }); };
  const handleSave = id => { setConsultations(consultations.map(c => c.id === id ? editValues : c)); setEditingId(null); };
  const handleAdd = () => {
    const nextId = consultations.length ? Math.max(...consultations.map(c => c.id)) + 1 : 1;
    setConsultations([...consultations, { ...newConsultation, id: nextId }]);
    setNewConsultation({ title: '', date: '', time: '', createdBy: '', status: 'Finished', password: '' });
    setAdding(false);
  };

  return (
    <div style={{
      marginLeft: sidebarCollapsed ? '70px' : '250px',
      paddingTop: '80px',
      marginTop: '80px',
      transition: 'margin-left 0.3s ease-in-out',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ color: '#2c3e50', fontWeight: '600' }}>Live Consultations</h2>
          <p style={{ color: '#6b7280' }}>Manage and schedule your online patient consultations.</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '10px 20px', backgroundColor: '#4e73df', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <FaVideo style={{ marginRight: '8px' }} /> New Live Meeting
        </button>
      </div>

      {/* Search */}
      <input type="text" placeholder="🔍 Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ maxWidth: '250px', borderRadius: '8px', padding: '8px', marginBottom: '20px' }} />

      {/* Table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date & Time</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Created By</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Password</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  {editingId === c.id ? <input value={editValues.title} onChange={e => setEditValues({ ...editValues, title: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} /> : c.title}
                </td>
                <td style={{ padding: '12px' }}>
                  {editingId === c.id ? (
                    <>
                      <input value={editValues.date} onChange={e => setEditValues({ ...editValues, date: e.target.value })} style={{ padding: '5px', borderRadius: '5px', marginBottom: '4px' }} /><br />
                      <input value={editValues.time} onChange={e => setEditValues({ ...editValues, time: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} />
                    </>
                  ) : (
                    <div style={{ fontSize: '12px' }}>{c.time}<br />{c.date}</div>
                  )}
                </td>
                <td style={{ padding: '12px' }}>{editingId === c.id ? <input value={editValues.createdBy} onChange={e => setEditValues({ ...editValues, createdBy: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} /> : c.createdBy}</td>
                <td style={{ padding: '12px' }}>
                  {editingId === c.id ? (
                    <select value={editValues.status} onChange={e => setEditValues({ ...editValues, status: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }}>
                      <option>Finished</option>
                      <option>Cancelled</option>
                    </select>
                  ) : (
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: c.status === 'Finished' ? '#d1e7dd' : '#f8d7da', color: c.status === 'Finished' ? '#0f5132' : '#842029' }}>{c.status}</span>
                  )}
                </td>
                <td style={{ padding: '12px' }}>{editingId === c.id ? <input value={editValues.password} onChange={e => setEditValues({ ...editValues, password: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} /> : c.password}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  {editingId === c.id ? (
                    <>
                      <FaSave style={{ cursor: 'pointer', color: '#22c55e' }} onClick={() => handleSave(c.id)} />
                      <FaTimes style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{ cursor: 'pointer', color: '#6366f1' }} onClick={() => handleEdit(c)} />
                      <FaTrash style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => handleDelete(c.id)} />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: '8px 12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: currentPage === i + 1 ? '#4e73df' : '#fff',
                color: currentPage === i + 1 ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {adding && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100vw', height:'100vh',
        marginLeft : sidebarCollapsed ? '70px' : '100px',
        backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div style={{ background:'#fff', padding:'30px', borderRadius:'12px', minWidth:'300px' }}>
            <h3 style={{ marginBottom:'20px' }}>Add New Consultation</h3>
            <input type="text" placeholder="Title" value={newConsultation.title} onChange={e=>setNewConsultation({...newConsultation,title:e.target.value})} style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc' }} />
            <input type="text" placeholder="Date" value={newConsultation.date} onChange={e=>setNewConsultation({...newConsultation,date:e.target.value})} style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc' }} />
            <input type="text" placeholder="Time" value={newConsultation.time} onChange={e=>setNewConsultation({...newConsultation,time:e.target.value})} style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc' }} />
            <input type="text" placeholder="Created By" value={newConsultation.createdBy} onChange={e=>setNewConsultation({...newConsultation,createdBy:e.target.value})} style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc' }} />
            <input type="text" placeholder="Password" value={newConsultation.password} onChange={e=>setNewConsultation({...newConsultation,password:e.target.value})} style={{ width:'100%', padding:'10px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #ccc' }} />
            <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px' }}>
              <button onClick={()=>setAdding(false)} style={{ padding:'10px 20px', borderRadius:'8px', border:'1px solid #ccc', cursor:'pointer' }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding:'10px 20px', borderRadius:'8px', border:'none', backgroundColor:'#4e73df', color:'#fff', cursor:'pointer' }}>Add</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Live_Consultations;
