import React, { useState, useMemo } from 'react';
import { FaTrashAlt, FaEdit, FaSave, FaTimes, FaPlus, FaFileUpload } from 'react-icons/fa';

const Reports = ({ sidebarCollapsed }) => {
  const [data, setData] = useState([
    { id: 1, title: 'Blood Test', type: 'Pathology', date: '2025-08-01', uploadedBy: 'Dr. Smith' },
    { id: 2, title: 'X-Ray Chest', type: 'Radiology', date: '2025-08-03', uploadedBy: 'Dr. John' },
    { id: 3, title: 'ECG Report', type: 'Cardiology', date: '2025-08-05', uploadedBy: 'Dr. Alice' },
    { id: 4, title: 'MRI Brain', type: 'Radiology', date: '2025-08-07', uploadedBy: 'Dr. Bob' },
  ]);

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newRecord, setNewRecord] = useState({ title: '', type: '', date: '', uploadedBy: '' });

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search and sort
  const filteredData = useMemo(() => {
    let filtered = data.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
      item.date.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, search, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSave = id => {
    setData(data.map(item => item.id === id ? editValues : item));
    setEditingId(null);
  };

  const handleAdd = () => {
    const nextId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { ...newRecord, id: nextId }]);
    setNewRecord({ title: '', type: '', date: '', uploadedBy: '' });
    setAdding(false);
    setCurrentPage(totalPages);
  };

  return (
    <div style={{
      marginLeft: sidebarCollapsed ? '70px' : '250px',
      marginTop: '100px',   // 🔥 extra gap from top
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '20px'
    }}>


      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="mb-1" style={{ color: '#2c3e50', fontWeight: '600' }}>Reports</h2>
          <p className="text-muted mb-0">View, upload and manage reports easily.</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px', background: '#4e73df', color: '#fff', border: 'none', cursor: 'pointer' }}>
          <FaFileUpload style={{ marginRight: '8px' }} /> New Report
        </button>
      </div>

      {/* Search */}
      <input type="text" placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px', borderRadius: '8px', maxWidth: '300px', marginBottom: '20px' }} />

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9', cursor: 'pointer' }}>
            <tr>
              <th style={{ padding: '12px' }} onClick={() => requestSort('title')}>TITLE {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('type')}>TYPE {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('date')}>DATE {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('uploadedBy')}>UPLOADED BY {sortConfig.key === 'uploadedBy' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.title} onChange={e => setEditValues({ ...editValues, title: e.target.value })} /> : item.title}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.type} onChange={e => setEditValues({ ...editValues, type: e.target.value })} /> : item.type}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.date} onChange={e => setEditValues({ ...editValues, date: e.target.value })} /> : item.date}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.uploadedBy} onChange={e => setEditValues({ ...editValues, uploadedBy: e.target.value })} /> : item.uploadedBy}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                  {editingId === item.id ? (
                    <>
                      <FaSave style={{ cursor: 'pointer', color: '#22c55e' }} onClick={() => handleSave(item.id)} />
                      <FaTimes style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => { setEditingId(item.id); setEditValues(item); }} />
                      <FaTrashAlt style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => setData(data.filter(d => d.id !== item.id))} />
                    </>
                  )}
                </td>
              </tr>
            ))}
            {currentData.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', color: '#6b7280' }}>No records found</td></tr>}
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

      {/* Add Modal */}
      {adding && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Report</h3>
            {['title', 'type', 'date', 'uploadedBy'].map(key => (
              <input key={key} type="text" placeholder={key.toUpperCase()} value={newRecord[key]} onChange={e => setNewRecord({ ...newRecord, [key]: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
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

export default Reports;
