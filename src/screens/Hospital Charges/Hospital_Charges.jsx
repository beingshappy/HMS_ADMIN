import React, { useState } from 'react';
import { FaMoneyBillWave, FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const Hospital_Charges = ({ sidebarCollapsed }) => {
  const [charges, setCharges] = useState([
    { id: 1, name: 'Consultation', charge: 500 },
    { id: 2, name: 'Operation Theatre', charge: 10000 },
    { id: 3, name: 'ICU', charge: 5000 },
    { id: 4, name: 'Room Rent', charge: 1200 },
    { id: 5, name: 'Emergency Services', charge: 700 },
    { id: 6, name: 'Lab Test', charge: 300 },
    { id: 7, name: 'X-Ray', charge: 250 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', charge: '' });
  const [adding, setAdding] = useState(false);
  const [newCharge, setNewCharge] = useState({ name: '', charge: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered & Paginated
  const filteredCharges = charges.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.charge.toString().includes(searchTerm)
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCharges = filteredCharges.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCharges.length / itemsPerPage);

  // Handlers
  const handleDelete = (id) => setCharges(charges.filter((item) => item.id !== id));
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({ name: item.name, charge: item.charge });
  };
  const handleSave = (id) => {
    setCharges(
      charges.map((item) =>
        item.id === id ? { ...item, name: editValues.name, charge: Number(editValues.charge) } : item
      )
    );
    setEditingId(null);
  };
  const handleAdd = () => {
    const nextId = charges.length ? Math.max(...charges.map((c) => c.id)) + 1 : 1;
    setCharges([...charges, { id: nextId, name: newCharge.name, charge: Number(newCharge.charge) }]);
    setNewCharge({ name: '', charge: '' });
    setAdding(false);
  };

  return (
    <div
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        marginTop: '80px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ color: '#2c3e50', fontWeight: '600', marginBottom: '5px' }}>Hospital Charges</h2>
          <p style={{ color: '#6c757d' }}>Manage services and standard charges.</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          style={{
            borderRadius: '8px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#4e73df',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FaPlus style={{ marginRight: '8px' }} /> Add Charge
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ maxWidth: '400px', borderRadius: '8px', border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}
      />

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead style={{ backgroundColor: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>SERVICE</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>STANDARD CHARGE</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentCharges.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px', fontWeight: '500', color: '#2c3e50' }}>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      style={{ padding: '5px', borderRadius: '5px', width: '90%' }}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editValues.charge}
                      onChange={(e) => setEditValues({ ...editValues, charge: e.target.value })}
                      style={{ padding: '5px', borderRadius: '5px', width: '90%' }}
                    />
                  ) : (
                    `$${item.charge.toLocaleString()}`
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  {editingId === item.id ? (
                    <>
                      <FaSave
                        style={{ color: '#22c55e', cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleSave(item.id)}
                      />
                      <FaTimes style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{ color: '#6366f1', cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(item)} />
                      <FaTrash style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* Add Charge Modal */}
      {adding && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Charge</h3>
            <input
              type="text"
              placeholder="Service Name"
              value={newCharge.name}
              onChange={(e) => setNewCharge({ ...newCharge, name: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Charge Amount"
              value={newCharge.charge}
              onChange={(e) => setNewCharge({ ...newCharge, charge: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setAdding(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#4e73df', color: '#fff', cursor: 'pointer' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospital_Charges;
