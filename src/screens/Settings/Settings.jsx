import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Settings = ({ sidebarCollapsed }) => {
  const [search, setSearch] = useState('');
  const [settings, setSettings] = useState([
    { key: 'Hospital Name', value: 'City Hospital', description: 'Name of the hospital' },
    { key: 'Max Patients', value: '500', description: 'Maximum patients per day' },
    { key: 'Enable SMS', value: 'Yes', description: 'Enable SMS notifications' },
    { key: 'Enable Email', value: 'Yes', description: 'Enable Email notifications' },
    { key: 'Working Hours', value: '8 AM - 8 PM', description: 'Hospital working hours' },
    { key: 'Admin Contact', value: 'admin@cityhospital.com', description: 'Contact email for admin' },
  ]);

  const filteredData = settings.filter(
    (item) =>
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteSetting = (index) => {
    const newData = [...settings];
    newData.splice(index, 1);
    setSettings(newData);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? '70px' : '250px',
        paddingTop: '80px',
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
              Settings
            </h2>
            <p className="text-muted mb-0">Manage hospital configurations and preferences.</p>
          </div>
          <button className="btn btn-primary">Add Setting</button>
        </div>

        {/* Search */}
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search settings"
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
                <th>Key</th>
                <th>Value</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((setting, index) => (
                <tr key={index}>
                  <td>{setting.key}</td>
                  <td>{setting.value}</td>
                  <td>{setting.description}</td>
                  <td>
                    <FaTrashAlt
                      className="text-danger me-3 cursor-pointer"
                      onClick={() => deleteSetting(settings.indexOf(setting))}
                    />
                    <FaEdit className="text-primary cursor-pointer" />
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No settings found
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

export default Settings;
