import React, { useState } from 'react';
import { FaTrashAlt, FaEdit, FaEnvelope, FaSms } from 'react-icons/fa';

const SMS_Mail = ({ sidebarCollapsed }) => {
  const [search, setSearch] = useState('');
  const [messages, setMessages] = useState([
    { type: 'SMS', recipient: 'John Doe', subject: '-', content: 'Your appointment is tomorrow at 10 AM.' },
    { type: 'Mail', recipient: 'Jane Smith', subject: 'Invoice', content: 'Your medical invoice is attached.' },
    { type: 'SMS', recipient: 'Alice Johnson', subject: '-', content: 'Reminder: Blood test results are ready.' },
    { type: 'Mail', recipient: 'Bob Brown', subject: 'Appointment Confirmation', content: 'Your appointment is confirmed for Aug 25.' },
    { type: 'SMS', recipient: 'Charlie Lee', subject: '-', content: 'Your prescription has been updated.' },
    { type: 'Mail', recipient: 'David Kim', subject: 'Follow-up', content: 'Please schedule your follow-up visit.' },
    { type: 'SMS', recipient: 'Eva Green', subject: '-', content: 'Your vaccination schedule is due.' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = messages.filter(
    (msg) =>
      msg.recipient.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase()) ||
      msg.content.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteMessage = (index) => {
    const newData = [...messages];
    newData.splice(index, 1);
    setMessages(newData);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
        marginTop: '50px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#f4f6f9',
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1" style={{ color: '#2c3e50', fontWeight: '600' }}>
              SMS / Mail
            </h2>
            <p className="text-muted mb-0">Send messages or emails to patients or staff.</p>
          </div>
          <div>
            <button className="btn btn-primary me-2">
              <FaSms className="me-1" /> New SMS
            </button>
            <button className="btn btn-primary">
              <FaEnvelope className="me-1" /> New Mail
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search messages"
            style={{ maxWidth: '300px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="card p-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((msg, index) => (
                <tr key={index}>
                  <td>{msg.type}</td>
                  <td>{msg.recipient}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.content}</td>
                  <td>
                    <FaTrashAlt
                      className="text-danger me-3 cursor-pointer"
                      onClick={() => deleteMessage(messages.indexOf(msg))}
                    />
                    <FaEdit className="text-primary cursor-pointer" />
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-primary me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMS_Mail;
