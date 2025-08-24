import React, { useState } from 'react';
import { FaFilter, FaFileAlt, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const initialCalls = [
  { name: "testt1", phone: "N/A", received: "14th May, 2025", followUp: "14th May,2025", type: "Incoming" },
  { name: "deep", phone: "62421564153", received: "2nd Jan, 2025", followUp: "2nd Jan,2025", type: "Incoming" },
  { name: "Florence Bolton", phone: "919874563214", received: "N/A", followUp: "N/A", type: "Outgoing" },
];

const types = ['All', 'Incoming', 'Outgoing'];

const Front_Office = ({ sidebarCollapsed }) => {
  const [calls, setCalls] = useState(initialCalls);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newCall, setNewCall] = useState({ name: '', phone: '', received: '', followUp: '', type: 'Incoming' });
  const itemsPerPage = 4;

  const filteredCalls = calls.filter(call => {
    const matchSearch = call.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || call.type === filterType;
    return matchSearch && matchType;
  });

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const paginatedCalls = filteredCalls.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete call log for ${name}?`)) {
      setCalls(prev => prev.filter(c => c.name !== name));
    }
  };

  const handleEdit = (name) => {
    alert(`Edit functionality for ${name} not implemented yet.`);
  };

  const handleAddCall = () => {
    if (!newCall.name || !newCall.phone || !newCall.received || !newCall.followUp) {
      alert('Please fill all fields!');
      return;
    }
    setCalls(prev => [newCall, ...prev]);
    setNewCall({ name: '', phone: '', received: '', followUp: '', type: 'Incoming' });
    setShowForm(false);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        marginTop: '80px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: '100vh',
        backgroundColor: '#f1f6fb',
        padding: '20px',
      }}
    >
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search"
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '250px' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
          {/* Filter Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              <FaFilter style={{ marginRight: '5px' }} /> {filterType}
            </button>
            {filterOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '45px',
                  left: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  zIndex: 10,
                }}
              >
                {types.map((type, idx) => (
                  <span
                    key={idx}
                    onClick={() => { setFilterType(type); setFilterOpen(false); setCurrentPage(1); }}
                    style={{
                      padding: '5px 10px',
                      cursor: 'pointer',
                      backgroundColor: filterType === type ? '#4e73df' : 'transparent',
                      color: filterType === type ? '#fff' : '#000',
                      borderRadius: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              background: '#4caf50',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <FaPlus style={{ marginRight: '5px' }} /> New Call Log
          </button>
        </div>
      </div>

      {/* Add Call Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 20
        }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', width: '400px', position: 'relative' }}>
            <FaTimes style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
              onClick={() => setShowForm(false)} />
            <h3 style={{ marginBottom: '10px' }}>Add New Call Log</h3>
            <input type="text" placeholder="Name" value={newCall.name} onChange={e => setNewCall({...newCall, name: e.target.value})}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Phone" value={newCall.phone} onChange={e => setNewCall({...newCall, phone: e.target.value})}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Received On" value={newCall.received} onChange={e => setNewCall({...newCall, received: e.target.value})}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Follow-up Date" value={newCall.followUp} onChange={e => setNewCall({...newCall, followUp: e.target.value})}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <select value={newCall.type} onChange={e => setNewCall({...newCall, type: e.target.value})}
              style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </select>
            <button onClick={handleAddCall} style={{ padding: '10px', width: '100%', borderRadius: '8px', background: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Add Call
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#4e73df', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>NAME</th>
            <th style={{ padding: '10px' }}>PHONE</th>
            <th style={{ padding: '10px' }}>RECEIVED ON</th>
            <th style={{ padding: '10px' }}>FOLLOW-UP DATE</th>
            <th style={{ padding: '10px' }}>CALL TYPE</th>
            <th style={{ padding: '10px' }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCalls.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{row.name}</td>
              <td style={{ padding: '10px' }}>{row.phone}</td>
              <td style={{ padding: '10px' }}>{row.received}</td>
              <td style={{ padding: '10px' }}>{row.followUp}</td>
              <td style={{ padding: '10px' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '5px',
                  color: '#fff',
                  backgroundColor: row.type === 'Incoming' ? '#4caf50' : '#ff9800',
                }}>
                  {row.type}
                </span>
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '5px' }}>
                <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(row.name)} />
                <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(row.name)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              background: currentPage === idx + 1 ? '#4e73df' : '#fff',
              color: currentPage === idx + 1 ? '#fff' : '#000',
            }}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Front_Office;
