import React, { useState } from 'react';
import { FaFilter, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Inventories = ({ sidebarCollapsed }) => {
  const [items, setItems] = useState([
    { id: 1, item: 'ebs item', category: 'ebs item categori', issue: '10th Jul,2025', return: '11th Jul,2025', qty: 900, returned: false },
    { id: 2, item: 'Tele', category: 'Abhishek Parekh', issue: '10th Jun,2025', return: '25th Jun,2025', qty: 1, returned: false },
    { id: 3, item: 'bbbb', category: 'mmmmm', issue: '10th Jun,2025', return: '11th Jun,2025', qty: 1, returned: false },
    { id: 4, item: 'Demo', category: 'Abhishek Parekh', issue: '21st May,2025', return: '24th May,2025', qty: 500, returned: false },
    { id: 5, item: 'Tele', category: 'Abhishek Parekh', issue: '15th Jan,2025', return: '31st Jan,2025', qty: 0, returned: true },
    { id: 6, item: 'Jarum Suntik', category: 'Alat Medis', issue: '15th Jan,2025', return: '10th Mar,2025', qty: 0, returned: true },
    { id: 7, item: 'Bed test', category: 'Bed', issue: '6th Jan,2025', return: '26th Apr,2025', qty: 0, returned: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', category: '', issue: '', return: '', qty: '', returned: false });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered & paginated
  const filteredItems = items.filter(
    i =>
      i.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handlers
  const handleDelete = id => setItems(items.filter(i => i.id !== id));
  const handleEdit = item => {
    setEditingId(item.id);
    setEditValues({ ...item });
  };
  const handleSave = id => {
    setItems(items.map(i => (i.id === id ? { ...editValues, qty: Number(editValues.qty) } : i)));
    setEditingId(null);
  };
  const handleAdd = () => {
    const nextId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { ...newItem, id: nextId, qty: Number(newItem.qty) }]);
    setNewItem({ item: '', category: '', issue: '', return: '', qty: '', returned: false });
    setAdding(false);
  };

  return (
    <div style={{
      marginLeft: sidebarCollapsed ? '70px' : '250px',
      paddingTop: '80px',
      marginTop: '120px',
      transition: 'margin-left 0.3s ease-in-out',
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ maxWidth: '250px', borderRadius: '8px', padding: '8px' }}
          />
          <button style={{ borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <FaFilter />
          </button>
        </div>
        <button
          onClick={() => setAdding(true)}
          style={{ borderRadius: '8px', padding: '10px 20px', display: 'flex', alignItems: 'center', cursor: 'pointer', backgroundColor: '#4e73df', color: '#fff', border: 'none' }}
        >
          <FaPlus style={{ marginRight: '8px' }} /> New Issued Item
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '12px', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>ITEM</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>CATEGORY</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ISSUE DATE</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>RETURN DATE</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>QUANTITY</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(i => (
              <tr key={i.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>
                  {editingId === i.id ? (
                    <input type="text" value={editValues.item} onChange={e => setEditValues({ ...editValues, item: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} />
                  ) : i.item}
                </td>
                <td style={{ padding: '12px' }}>
                  {editingId === i.id ? (
                    <input type="text" value={editValues.category} onChange={e => setEditValues({ ...editValues, category: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} />
                  ) : i.category}
                </td>
                <td style={{ padding: '12px' }}>
                  {editingId === i.id ? (
                    <input type="text" value={editValues.issue} onChange={e => setEditValues({ ...editValues, issue: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} />
                  ) : i.issue}
                </td>
                <td style={{ padding: '12px' }}>
                  {editingId === i.id ? (
                    <input type="text" value={editValues.return} onChange={e => setEditValues({ ...editValues, return: e.target.value })} style={{ padding: '5px', borderRadius: '5px' }} />
                  ) : i.return}
                </td>
                <td style={{ padding: '12px' }}>
                  {editingId === i.id ? (
                    <input type="number" value={editValues.qty} onChange={e => setEditValues({ ...editValues, qty: e.target.value })} style={{ padding: '5px', borderRadius: '5px', width: '80px' }} />
                  ) : i.qty}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: i.returned ? '#d1e7dd' : '#cff4fc', color: i.returned ? '#0f5132' : '#055160' }}>
                    {i.returned ? 'Returned' : 'Return Item'}
                  </span>
                </td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  {editingId === i.id ? (
                    <>
                      <FaSave style={{ cursor: 'pointer', color: '#22c55e' }} onClick={() => handleSave(i.id)} />
                      <FaTimes style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{ cursor: 'pointer', color: '#6366f1' }} onClick={() => handleEdit(i)} />
                      <FaTrash style={{ cursor: 'pointer', color: '#ef4444' }} onClick={() => handleDelete(i.id)} />
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

      {/* Add Item Modal */}
      {adding && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          marginLeft: sidebarCollapsed ? '70px' : '100px',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Item</h3>
            <input
              type="text" placeholder="Item Name" value={newItem.item}
              onChange={e => setNewItem({ ...newItem, item: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text" placeholder="Category" value={newItem.category}
              onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text" placeholder="Issue Date" value={newItem.issue}
              onChange={e => setNewItem({ ...newItem, issue: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text" placeholder="Return Date" value={newItem.return}
              onChange={e => setNewItem({ ...newItem, return: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="number" placeholder="Quantity" value={newItem.qty}
              onChange={e => setNewItem({ ...newItem, qty: e.target.value })}
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setAdding(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#4e73df', color: '#fff', cursor: 'pointer' }}>Add</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventories;
