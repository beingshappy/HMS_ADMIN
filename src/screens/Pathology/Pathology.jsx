import React, { useState, useMemo } from 'react';
import { FaTrashAlt, FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const Pathology = ({ sidebarCollapsed }) => {
  const [data, setData] = useState([
    { id: 1, job: '', loneliness: '%', reference: '70-180', name: 'Glucose mo' },
    { id: 2, job: '', loneliness: 'mill/cumm', reference: '2000', name: 'ebc' },
    { id: 3, job: '', loneliness: 'mill/cumm', reference: 'reference', name: 'report 1' },
    { id: 4, job: '', loneliness: '%', reference: 'wwwwwwww', name: 'www' },
    { id: 5, job: '', loneliness: 'ECG', reference: 'Ytt', name: 'Ggg' },
    { id: 6, job: '', loneliness: 'g/dl', reference: '952', name: 'ui0h8uh' },
    { id: 7, job: '', loneliness: 'Qwerty 1', reference: '12', name: 'n.paul' },
  ]);

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newRecord, setNewRecord] = useState({ job: '', loneliness: '', reference: '', name: '' });

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    let filtered = data.filter(item =>
      item.job.toLowerCase().includes(search.toLowerCase()) ||
      item.loneliness.toLowerCase().includes(search.toLowerCase()) ||
      item.reference.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
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
    setNewRecord({ job: '', loneliness: '', reference: '', name: '' });
    setAdding(false);
    setCurrentPage(totalPages);
  };

  return (
    <div style={{
      marginLeft: sidebarCollapsed ? '70px' : '250px',
      marginTop: '100px',   // 👈 extra gap from top
      minHeight: '100vh',
      background: '#f4f6f9',
      padding: '20px'
    }}>


      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '8px', borderRadius: '8px', maxWidth: '250px' }} />
        <button onClick={() => setAdding(true)} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px', background: '#4e73df', color: '#fff', border: 'none', cursor: 'pointer' }}><FaPlus style={{ marginRight: '8px' }} />New Pathology Record</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f1f5f9', cursor: 'pointer' }}>
            <tr>
              <th style={{ padding: '12px' }} onClick={() => requestSort('job')}>A JOB {sortConfig.key === 'job' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('loneliness')}>LONELINESS {sortConfig.key === 'loneliness' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('reference')}>REFERENCE GROUP {sortConfig.key === 'reference' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }} onClick={() => requestSort('name')}>NAME {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
              <th style={{ padding: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.job} onChange={e => setEditValues({ ...editValues, job: e.target.value })} /> : item.job}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.loneliness} onChange={e => setEditValues({ ...editValues, loneliness: e.target.value })} /> : item.loneliness}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.reference} onChange={e => setEditValues({ ...editValues, reference: e.target.value })} /> : item.reference}</td>
                <td style={{ padding: '12px' }}>{editingId === item.id ? <input value={editValues.name} onChange={e => setEditValues({ ...editValues, name: e.target.value })} /> : item.name}</td>
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
            <h3 style={{ marginBottom: '20px' }}>Add New Pathology Record</h3>
            {['job', 'loneliness', 'reference', 'name'].map(key => (
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

export default Pathology;
