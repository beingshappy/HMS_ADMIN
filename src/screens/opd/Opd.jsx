import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";

const initialPatients = [
  {
    opdNo: "JYKCBYZT",
    patientName: "11111 1111",
    patientEmail: "sulapojim@mailinator.com",
    patientAvatar: "11",
    doctorName: "Branly De León",
    doctorEmail: "server@mango.com.gt",
    doctorAvatar: "BL",
    time: "04:46 PM",
    date: "July 31, 2025",
    charge: "$455.54",
    payment: "Cash",
  },
  {
    opdNo: "2K3ZVJPO",
    patientName: "ABOUA ROGER",
    patientEmail: "rogerfransois@gmail.com",
    patientAvatar: "AR",
    doctorName: "Annie Bsseor",
    doctorEmail: "admin@hmqqs.com",
    doctorAvatar: "AB",
    time: "11:54 AM",
    date: "July 27, 2025",
    charge: "$500.00",
    payment: "Cash",
  },
];

const Opd = ({ sidebarCollapsed }) => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    doctorName: "",
    doctorEmail: "",
    time: "",
    date: "",
    charge: "",
    payment: "",
  });

  const recordsPerPage = 6;

  // Filtered + paginated data
  const filtered = patients.filter(
    (p) =>
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.opdNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      opdNo: "OPD-" + Math.floor(Math.random() * 10000),
      patientAvatar: formData.patientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      doctorAvatar: formData.doctorName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      ...formData,
    };
    setPatients((prev) => [newPatient, ...prev]);
    setShowModal(false);
    setFormData({
      patientName: "",
      patientEmail: "",
      doctorName: "",
      doctorEmail: "",
      time: "",
      date: "",
      charge: "",
      payment: "",
    });
    setCurrentPage(1);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container-opd p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold" style={{ color: "#2c3e50" }}>
              OPD - Patient Out
            </h2>
            <p className="text-muted">List and manage outpatient records here.</p>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <FaUserCheck /> New OPD patient
          </button>
        </div>

        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search patient, doctor or OPD no."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="card p-3 shadow-sm bg-white rounded">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>OPD NO</th>
                  <th>PATIENT</th>
                  <th>DOCTOR</th>
                  <th>DATE DAY</th>
                  <th>STANDARD CHARGE</th>
                  <th>PAYMENT</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((p, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="badge bg-secondary">{p.opdNo}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex justify-content-center align-items-center text-white"
                          style={{
                            width: "40px",
                            height: "40px",
                            background: "#0d6efd",
                          }}
                        >
                          {p.patientAvatar}
                        </div>
                        <div>
                          <div className="fw-bold text-primary">{p.patientName}</div>
                          <div className="text-muted" style={{ fontSize: "13px" }}>
                            {p.patientEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle d-flex justify-content-center align-items-center text-white"
                          style={{
                            width: "40px",
                            height: "40px",
                            background: "#198754",
                          }}
                        >
                          {p.doctorAvatar}
                        </div>
                        <div>
                          <div className="fw-bold">{p.doctorName}</div>
                          <div className="text-muted" style={{ fontSize: "13px" }}>
                            {p.doctorEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold">{p.time}</div>
                      <div className="text-muted" style={{ fontSize: "13px" }}>
                        {p.date}
                      </div>
                    </td>
                    <td>{p.charge}</td>
                    <td>
                      <span className="badge bg-info text-dark">{p.payment}</span>
                    </td>
                  </tr>
                ))}
                {currentRecords.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of{" "}
              {filtered.length}
            </span>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content p-4 rounded bg-white"
            style={{ width: "500px" }}
          >
            <h5 className="mb-3">Add New OPD Patient</h5>
            <form onSubmit={handleAddPatient} className="d-flex flex-column gap-2">
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                className="form-control"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="patientEmail"
                placeholder="Patient Email"
                className="form-control"
                value={formData.patientEmail}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="doctorName"
                placeholder="Doctor Name"
                className="form-control"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="doctorEmail"
                placeholder="Doctor Email"
                className="form-control"
                value={formData.doctorEmail}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="time"
                placeholder="Time (e.g., 04:30 PM)"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="charge"
                placeholder="Charge"
                className="form-control"
                value={formData.charge}
                onChange={handleChange}
                required
              />
              <select
                name="payment"
                className="form-control"
                value={formData.payment}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Insurance">Insurance</option>
              </select>

              <div className="d-flex justify-content-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opd;
