import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Vaccinations = ({ sidebarCollapsed }) => {
  const [search, setSearch] = useState('');
  const [vaccines, setVaccines] = useState([
    { patient: 'John Doe', vaccine: 'COVID-19', date: '2025-08-01', dose: '1st Dose' },
    { patient: 'Jane Smith', vaccine: 'Hepatitis B', date: '2025-07-20', dose: '2nd Dose' },
    { patient: 'Ali Khan', vaccine: 'Polio', date: '2025-06-15', dose: 'Booster' },
    { patient: 'Mary Jane', vaccine: 'Flu', date: '2025-08-10', dose: '1st Dose' },
    { patient: 'Tom Hardy', vaccine: 'COVID-19', date: '2025-08-05', dose: '2nd Dose' },
    { patient: 'Lucy Liu', vaccine: 'Hepatitis B', date: '2025-07-25', dose: '1st Dose' },
  ]);

  // Search filter
  const filteredData = vaccines.filter(
    (v) =>
      v.patient.toLowerCase().includes(search.toLowerCase()) ||
      v.vaccine.toLowerCase().includes(search.toLowerCase()) ||
      v.date.includes(search) ||
      v.dose.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteVaccine = (index) => {
    const newData = [...vaccines];
    newData.splice(index, 1);
    setVaccines(newData);
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
              Vaccinations
            </h2>
            <p className="text-muted mb-0">Manage patient vaccination records and schedules.</p>
          </div>
          <button className="btn btn-primary">Add Vaccination</button>
        </div>

        {/* Search */}
        <div className="d-flex mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search patient, vaccine or date"
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
                <th>Patient</th>
                <th>Vaccine</th>
                <th>Date</th>
                <th>Dose</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((vaccine, index) => (
                <tr key={index}>
                  <td>{vaccine.patient}</td>
                  <td>{vaccine.vaccine}</td>
                  <td>{vaccine.date}</td>
                  <td>{vaccine.dose}</td>
                  <td>
                    <FaTrashAlt
                      className="text-danger me-3 cursor-pointer"
                      onClick={() => deleteVaccine(vaccines.indexOf(vaccine))}
                    />
                    <FaEdit className="text-primary cursor-pointer" />
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No records found
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

export default Vaccinations;
