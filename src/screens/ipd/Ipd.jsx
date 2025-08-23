import React, { useState } from "react";
import { FaProcedures, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

// Dummy IPD data
const initialIpdData = Array.from({ length: 10 }, (_, i) => ({
  ipdNo: `IPD-${1000 + i}`,
  patient: { name: `Patient ${i + 1}`, email: `patient${i + 1}@mail.com`, initials: "PT", color: "#10b981" },
  doctor: { name: `Doctor ${i + 1}`, email: `doctor${i + 1}@mail.com`, initials: "DR", color: "#ef4444" },
  admission: { time: "07:53 PM", date: `August ${4 + (i % 5)}, 2025` },
  bed: "Kamar IGD",
  invoiceStatus: i % 2 === 0 ? "Paid" : "Unpaid",
}));

const Ipd = ({ sidebarCollapsed }) => {
  const [ipdRecords, setIpdRecords] = useState(initialIpdData);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    doctorName: "",
    doctorEmail: "",
    bed: "",
    invoiceStatus: "Paid",
    admissionDate: "",
    admissionTime: "",
  });
  const recordsPerPage = 8;

  // Pagination & search
  const filteredRecords = ipdRecords.filter(
    (r) =>
      r.ipdNo.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      r.bed.toLowerCase().includes(search.toLowerCase()) ||
      r.invoiceStatus.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Handle form input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add new IPD record
  const addIpdPatient = () => {
    if (!form.patientName || !form.patientEmail || !form.doctorName || !form.doctorEmail || !form.bed || !form.admissionDate || !form.admissionTime) {
      alert("Please fill all fields!");
      return;
    }

    const newRecord = {
      ipdNo: `IPD-${1000 + ipdRecords.length + 1}`,
      patient: { name: form.patientName, email: form.patientEmail, initials: form.patientName.split(" ").map(n => n[0]).join("").toUpperCase(), color: "#10b981" },
      doctor: { name: form.doctorName, email: form.doctorEmail, initials: form.doctorName.split(" ").map(n => n[0]).join("").toUpperCase(), color: "#ef4444" },
      admission: { time: form.admissionTime, date: form.admissionDate },
      bed: form.bed,
      invoiceStatus: form.invoiceStatus,
    };
    setIpdRecords([newRecord, ...ipdRecords]);
    setShowModal(false);
    setForm({
      patientName: "",
      patientEmail: "",
      doctorName: "",
      doctorEmail: "",
      bed: "",
      invoiceStatus: "Paid",
      admissionDate: "",
      admissionTime: "",
    });
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
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="page-title">IPD - Patient In</h2>
            <p className="subtitle">Manage admitted patients and their treatment records.</p>
          </div>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
            <FaProcedures /> New IPD patient
          </button>
        </div>

        {/* Search */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            style={{ width: "300px", borderRadius: "8px" }}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>

        {/* Table */}
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>IPD NO</th>
                <th>PATIENT</th>
                <th>DOCTOR</th>
                <th>ADMISSION DATE</th>
                <th>BED</th>
                <th>INVOICE STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((row, idx) => (
                <tr key={idx}>
                  <td><span className="badge bg-secondary">{row.ipdNo}</span></td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{ width: "40px", height: "40px", backgroundColor: row.patient.color, fontWeight: "bold" }}
                      >{row.patient.initials}</div>
                      <div><strong>{row.patient.name}</strong><p className="text-muted mb-0" style={{ fontSize: "13px" }}>{row.patient.email}</p></div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{ width: "40px", height: "40px", backgroundColor: row.doctor.color, fontWeight: "bold" }}
                      >{row.doctor.initials}</div>
                      <div><strong>{row.doctor.name}</strong><p className="text-muted mb-0" style={{ fontSize: "13px" }}>{row.doctor.email}</p></div>
                    </div>
                  </td>
                  <td>{row.admission.time} <br/><small>{row.admission.date}</small></td>
                  <td><span className="badge bg-info text-dark">{row.bed}</span></td>
                  <td><span className={`badge ${row.invoiceStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>{row.invoiceStatus}</span></td>
                  <td>
                    <FaEdit className="text-primary me-3" style={{ cursor: "pointer" }} onClick={() => alert(`Edit ${row.ipdNo}`)}/>
                    <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={() => alert(`Delete ${row.ipdNo}`)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filteredRecords.length)} of {filteredRecords.length}
          </span>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-backdrop" style={{
            position: "fixed", top:0, left:0, right:0, bottom:0,
            backgroundColor: "rgba(0,0,0,0.4)", display:"flex",
            justifyContent:"center", alignItems:"center", zIndex:1000
          }}>
            <div className="bg-white p-4 rounded shadow-sm" style={{ width: "500px", position:"relative" }}>
              <FaTimes style={{position:"absolute", top:"15px", right:"15px", cursor:"pointer"}} onClick={()=>setShowModal(false)}/>
              <h5 className="mb-3">Add New IPD Patient</h5>
              <div className="mb-2">
                <input type="text" className="form-control mb-2" placeholder="Patient Name" name="patientName" value={form.patientName} onChange={handleChange}/>
                <input type="email" className="form-control mb-2" placeholder="Patient Email" name="patientEmail" value={form.patientEmail} onChange={handleChange}/>
                <input type="text" className="form-control mb-2" placeholder="Doctor Name" name="doctorName" value={form.doctorName} onChange={handleChange}/>
                <input type="email" className="form-control mb-2" placeholder="Doctor Email" name="doctorEmail" value={form.doctorEmail} onChange={handleChange}/>
                <input type="text" className="form-control mb-2" placeholder="Bed" name="bed" value={form.bed} onChange={handleChange}/>
                <input type="date" className="form-control mb-2" placeholder="Admission Date" name="admissionDate" value={form.admissionDate} onChange={handleChange}/>
                <input type="time" className="form-control mb-2" placeholder="Admission Time" name="admissionTime" value={form.admissionTime} onChange={handleChange}/>
                <select className="form-select" name="invoiceStatus" value={form.invoiceStatus} onChange={handleChange}>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <button className="btn btn-primary mt-2" onClick={addIpdPatient}>Add Patient</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Ipd;
