import React, { useState } from 'react';
import { FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';

const Services = ({ sidebarCollapsed }) => {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([
    { name: 'General Checkup', department: 'Outpatient', charge: 500 },
    { name: 'MRI Scan', department: 'Radiology', charge: 2500 },
    { name: 'Blood Test', department: 'Pathology', charge: 200 },
    { name: 'Physiotherapy', department: 'Rehab', charge: 1000 },
    { name: 'X-Ray', department: 'Radiology', charge: 800 },
    { name: 'Dental Cleaning', department: 'Dental', charge: 400 },
    { name: 'Eye Exam', department: 'Ophthalmology', charge: 300 },
    { name: 'ECG', department: 'Cardiology', charge: 600 },
    { name: 'Ultrasound', department: 'Radiology', charge: 1200 },
    { name: 'Vaccination', department: 'Immunization', charge: 150 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered & searched data
  const filteredData = services.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.department.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteService = (index) => {
    const newData = [...services];
    newData.splice(index, 1);
    setServices(newData);
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
              Services
            </h2>
            <p className="text-muted mb-0">Manage hospital services here.</p>
          </div>
          <button className="btn btn-primary d-flex align-items-center" style={{ borderRadius: '8px', padding: '10px 20px' }}>
            <FaPlus className="me-2" />
            Add Service
          </button>
        </div>

        {/* Search */}
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Services"
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
                <th>Service Name</th>
                <th>Department</th>
                <th>Charge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.department}</td>
                  <td>${service.charge}</td>
                  <td>
                    <FaTrashAlt
                      className="text-danger me-3 cursor-pointer"
                      onClick={() => deleteService(services.indexOf(service))}
                    />
                    <FaEdit className="text-primary cursor-pointer" />
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No services found
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

export default Services;
