import React, { useState } from 'react';
import { FaFilter, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const initialData = [
  { invoice: '13546', name: 'Althuraya', head: 'Building Rent', date: '17th May 2025', amount: '$10,000.00', attachment: 'N/A' },
  { invoice: '123456', name: 'Test', head: 'Telephone Bill', date: '19th April 2025', amount: '$10,000.00', attachment: 'Download' },
  { invoice: 'N/A', name: 'DS', head: 'Electricity Bill', date: '9th January 2025', amount: '$321,232.00', attachment: 'N/A' },
  { invoice: '252645626', name: 'Rohit Besra', head: 'Building Rent', date: '2nd January 2025', amount: '$5,500.00', attachment: 'N/A' },
  { invoice: 'N/A', name: 'Canteen', head: 'Building Rent', date: '19th December 2024', amount: '$50,000.00', attachment: 'N/A' },
  { invoice: '123456', name: 'Rapheal Odejinmi', head: 'Building Rent', date: '28th December 2024', amount: '$4,000.00', attachment: 'N/A' },
  { invoice: '00098988', name: 'Daniel Ihu', head: 'Electricity Bill', date: '25th December 2024', amount: '$50,000.00', attachment: 'N/A' },
];

const heads = ['All', 'Building Rent', 'Electricity Bill', 'Telephone Bill'];

const Finances = ({ sidebarCollapsed }) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filterHead, setFilterHead] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter & Search
  const filteredData = data.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchHead = filterHead === 'All' || item.head === filterHead;
    return matchSearch && matchHead;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Delete handler
  const handleDelete = (invoice) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      setData(prev => prev.filter(item => item.invoice !== invoice));
    }
  };

  // Edit handler (placeholder)
  const handleEdit = (invoice) => {
    alert(`Edit functionality for Invoice ${invoice} not implemented yet.`);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#f1f5f9',
        padding: '20px',
      }}
    >
      {/* Header */}
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
              <FaFilter style={{ marginRight: '5px' }} /> {filterHead}
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
                {heads.map((head, idx) => (
                  <span
                    key={idx}
                    onClick={() => { setFilterHead(head); setFilterOpen(false); setCurrentPage(1); }}
                    style={{
                      padding: '5px 10px',
                      cursor: 'pointer',
                      backgroundColor: filterHead === head ? '#4e73df' : 'transparent',
                      color: filterHead === head ? '#fff' : '#000',
                      borderRadius: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    {head}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
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
            <FaPlus style={{ marginRight: '5px' }} /> New Expense
          </button>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#4e73df', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>INVOICE</th>
            <th style={{ padding: '10px' }}>NAME</th>
            <th style={{ padding: '10px' }}>EXPENSE HEAD</th>
            <th style={{ padding: '10px' }}>DATE</th>
            <th style={{ padding: '10px' }}>AMOUNT</th>
            <th style={{ padding: '10px' }}>ATTACHMENT</th>
            <th style={{ padding: '10px' }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{row.invoice}</td>
              <td style={{ padding: '10px' }}>{row.name}</td>
              <td style={{ padding: '10px' }}>{row.head}</td>
              <td style={{ padding: '10px' }}>{row.date}</td>
              <td style={{ padding: '10px' }}>{row.amount}</td>
              <td style={{ padding: '10px', color: row.attachment === 'Download' ? '#3f51b5' : '#999' }}>
                {row.attachment}
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '5px' }}>
                <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(row.invoice)} />
                <FaTrash style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(row.invoice)} />
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

export default Finances;
