import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPrint, FaFileInvoiceDollar } from 'react-icons/fa';

const initialInvoices = [
  {
    id: 'OKXB6J',
    name: 'Hamza Ndauka',
    email: 'ndauka@example.com',
    status: 'Unpaid',
    time: '12:41 AM',
    date: 'August 4, 2025',
    amount: '$30.00',
    initials: 'HN',
    color: '#f66',
    image: null,
  },
  {
    id: 'RNAIFR',
    name: 'Ahmed Shawqi',
    email: 'ah7eeee30@gmail.com',
    status: 'Unpaid',
    time: '11:16 PM',
    date: 'July 17, 2025',
    amount: '$5,000.00',
    initials: 'AS',
    color: '#3399ff',
    image: null,
  },
];

const generateId = () => Math.random().toString(36).substring(2, 8).toUpperCase();
const generateInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

const Billings = ({ sidebarCollapsed }) => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    name: '',
    email: '',
    amount: '',
    status: 'Unpaid',
  });

  const recordsPerPage = 5;

  // Filter + pagination
  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.toLowerCase();
    return (
      invoice.name.toLowerCase().includes(query) ||
      invoice.email.toLowerCase().includes(query) ||
      invoice.id.toLowerCase().includes(query)
    );
  });

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredInvoices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredInvoices.length / recordsPerPage);

  // Add new invoice
  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!newInvoice.name || !newInvoice.email || !newInvoice.amount) return;

    const invoice = {
      id: generateId(),
      name: newInvoice.name,
      email: newInvoice.email,
      status: newInvoice.status,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      amount: newInvoice.amount,
      initials: generateInitials(newInvoice.name),
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      image: null,
    };

    setInvoices([invoice, ...invoices]);
    setNewInvoice({ name: '', email: '', amount: '', status: 'Unpaid' });
    setShowForm(false);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '130px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: '100vh',
        backgroundColor: '#f4f6fa',
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="mb-1" style={{ color: '#2c3e50', fontWeight: '600' }}>
              Billings
            </h2>
            <p className="text-muted mb-0">Manage hospital billing and invoices here.</p>
          </div>
          <div className="d-flex gap-3 align-items-center flex-wrap">
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="form-control"
              style={{ borderRadius: '8px', padding: '10px 14px', minWidth: '250px' }}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="btn btn-primary d-flex align-items-center"
              style={{ borderRadius: '8px', padding: '10px 20px' }}
              onClick={() => setShowForm(!showForm)}
            >
              <FaFileInvoiceDollar className="me-2" />
              New Invoice
            </button>
          </div>
        </div>

        {/* New Invoice Form */}
        {showForm && (
          <div className="card p-3 mb-3 shadow-sm bg-white rounded">
            <form onSubmit={handleAddInvoice} className="d-flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Patient Name"
                className="form-control"
                value={newInvoice.name}
                onChange={(e) => setNewInvoice({ ...newInvoice, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Patient Email"
                className="form-control"
                value={newInvoice.email}
                onChange={(e) => setNewInvoice({ ...newInvoice, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Amount"
                className="form-control"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
              />
              <select
                className="form-select"
                value={newInvoice.status}
                onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </form>
          </div>
        )}

        {/* Invoice Table */}
        <div className="card shadow-sm border-0 p-3 bg-white rounded">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((invoice, index) => (
                  <tr key={index}>
                    <td>
                      <span className="badge bg-light text-primary fw-semibold">
                        {invoice.id}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {invoice.image ? (
                          <img
                            src={invoice.image}
                            alt="avatar"
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div
                            className="rounded-circle text-white d-flex align-items-center justify-content-center"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: invoice.color || '#ccc',
                              fontWeight: '600',
                            }}
                          >
                            {invoice.initials}
                          </div>
                        )}
                        <div>
                          <div className="fw-semibold" style={{ color: '#3a76cb' }}>
                            {invoice.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#555' }}>
                            {invoice.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          invoice.status === 'Paid'
                            ? 'bg-success text-white'
                            : 'bg-light-danger text-danger'
                        } fw-semibold px-3 py-1`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-primary d-block">{invoice.time}</span>
                      <small className="text-muted">{invoice.date}</small>
                    </td>
                    <td>{invoice.amount}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <FaPrint style={{ color: '#f0ad4e', cursor: 'pointer' }} />
                        <FaEdit style={{ color: '#6f42c1', cursor: 'pointer' }} />
                        <FaTrash
                          style={{ color: '#dc3545', cursor: 'pointer' }}
                          onClick={() =>
                            setInvoices(invoices.filter((inv) => inv.id !== invoice.id))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
                {currentRecords.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filteredInvoices.length)} of{' '}
              {filteredInvoices.length}
            </span>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billings;
