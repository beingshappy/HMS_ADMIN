import React, { useState, useMemo } from 'react';
import { FaUserInjured, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Patients = ({ sidebarCollapsed }) => {
  const [patients, setPatients] = useState([
    { id: 1, admission: 'DNKLXRDR', name: 'Muhammad Umair Aslam', email: 'ranaumair455@gmail.com', doctor: 'Dr. Zia Farooqi', doctorEmail: 'ce@nidapakistan.org', acceptance: 'August 2, 2025 12:00 AM', discharge: '', deal: 'Checkup' },
    { id: 2, admission: 'DNKLXRD2', name: 'Jane Doe', email: 'jane@example.com', doctor: 'Dr. John Smith', doctorEmail: 'john@hospital.org', acceptance: 'August 3, 2025 2:00 PM', discharge: '', deal: 'Surgery' },
    { id: 3, admission: 'DNKLXRD3', name: 'John Roe', email: 'john@example.com', doctor: 'Dr. Anna Lee', doctorEmail: 'anna@hospital.org', acceptance: 'August 4, 2025 10:00 AM', discharge: '', deal: 'Consultation' },
    { id: 4, admission: 'DNKLXRD4', name: 'Alice Smith', email: 'alice@example.com', doctor: 'Dr. Zoe', doctorEmail: 'zoe@hospital.org', acceptance: 'August 5, 2025 9:00 AM', discharge: '', deal: 'Checkup' },
    // Add more initial patients
  ]);

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newPatient, setNewPatient] = useState({ admission: '', name: '', email: '', doctor: '', doctorEmail: '', acceptance: '', discharge: '', deal: '' });

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter + search
  const filteredPatients = useMemo(() => {
    let filtered = patients.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.doctor.toLowerCase().includes(search.toLowerCase()) ||
      p.admission.toLowerCase().includes(search.toLowerCase())
    );

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        // If sorting by date, convert to Date object
        if (sortConfig.key === 'acceptance') {
          valA = new Date(valA);
          valB = new Date(valB);
        }
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [patients, search, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSave = id => {
    setPatients(patients.map(p => p.id === id ? editValues : p));
    setEditingId(null);
  };

  const handleAdd = () => {
    const nextId = patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setPatients([...patients, { ...newPatient, id: nextId }]);
    setNewPatient({ admission: '', name: '', email: '', doctor: '', doctorEmail: '', acceptance: '', discharge: '', deal: '' });
    setAdding(false);
    setCurrentPage(totalPages); // move to last page to see newly added
  };

  return (
    <div style={{
      marginLeft: sidebarCollapsed ? '70px' : '250px',
      marginTop: '100px',   // 👈 extra space from top
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '20px'
    }}>


      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ color: '#2c3e50', fontWeight: '600', marginBottom: '5px' }}>Patients</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>Manage patient profiles and appointments.</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px', backgroundColor: '#4e73df', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <FaUserInjured style={{ marginRight: '8px' }} /> Add Patient
        </button>
      </div>

      {/* Search */}
      <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: '250px', borderRadius: '8px', padding: '8px', marginBottom: '15px' }} />

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9', cursor: 'pointer' }}>
            <tr>
              <th style={{ padding: '12px' }} onClick={() => requestSort('admission')}>Admission ID {sortConfig.key === 'admission' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }}>Patient</th>
              <th style={{ padding: '12px' }}>Doctor</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('acceptance')}>Acceptance Date {sortConfig.key === 'acceptance' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }}>Discharge Date</th>
              <th style={{ padding: '12px' }}>Deal</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.admission} onChange={e => setEditValues({ ...editValues, admission: e.target.value })} /> : <span style={{ color: '#0d6efd' }}>{p.admission}</span>}</td>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.name} onChange={e => setEditValues({ ...editValues, name: e.target.value })} /> : <><strong>{p.name}</strong><br /><small>{p.email}</small></>}</td>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.doctor} onChange={e => setEditValues({ ...editValues, doctor: e.target.value })} /> : <><strong>{p.doctor}</strong><br /><small>{p.doctorEmail}</small></>}</td>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.acceptance} onChange={e => setEditValues({ ...editValues, acceptance: e.target.value })} /> : p.acceptance}</td>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.discharge} onChange={e => setEditValues({ ...editValues, discharge: e.target.value })} /> : p.discharge}</td>
                <td style={{ padding: '12px' }}>{editingId === p.id ? <input value={editValues.deal} onChange={e => setEditValues({ ...editValues, deal: e.target.value })} /> : p.deal}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                  {editingId === p.id ? (
                    <>
                      <FaSave style={{ cursor: 'pointer', color: '#22c55e' }} onClick={() => handleSave(p.id)} />
                      <FaTimes style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => { setEditingId(p.id); setEditValues(p); }} />
                      <FaTrashAlt style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => setPatients(patients.filter(x => x.id !== p.id))} />
                    </>
                  )}
                </td>
              </tr>
            ))}
            {currentPatients.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', color: '#6b7280' }}>No records found</td></tr>}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', background: currentPage === i + 1 ? '#4e73df' : '#f1f5f9', color: currentPage === i + 1 ? '#fff' : '#000' }}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Next</button>
          </div>
        )}

      </div>

      {/* Add Patient Modal */}
      {adding && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Patient</h3>
            {['admission', 'name', 'email', 'doctor', 'doctorEmail', 'acceptance', 'discharge', 'deal'].map(key => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={newPatient[key]}
                onChange={e => setNewPatient({ ...newPatient, [key]: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setAdding(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4e73df', color: '#fff', cursor: 'pointer' }}>Add</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Patients;
