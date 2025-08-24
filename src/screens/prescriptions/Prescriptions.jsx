import React, { useState } from "react";
import { FaFilter, FaEye, FaEdit, FaTrashAlt, FaPrint } from "react-icons/fa";

const Prescriptions = ({ sidebarCollapsed }) => {
  // Initial sample data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: { name: "John Doe", email: "john@mail.com", initials: "JD" },
      doctor: { name: "Dr. Smith", email: "smith@mail.com", initials: "DS" },
      date: "15th Jul, 2025",
      status: true,
    },
    {
      id: 2,
      patient: { name: "Alice", email: "alice@mail.com", initials: "A" },
      doctor: { name: "Dr. Watson", email: "watson@mail.com", initials: "DW" },
      date: "N/A",
      status: false,
    },
  ]);

  const [search, setSearch] = useState("");

  // Add new prescription
  const addPrescription = () => {
    const newId = prescriptions.length + 1;
    const newPrescription = {
      id: newId,
      patient: {
        name: `Patient ${newId}`,
        email: `patient${newId}@mail.com`,
        initials: `P${newId}`,
      },
      doctor: {
        name: `Doctor ${newId}`,
        email: `doc${newId}@mail.com`,
        initials: `D${newId}`,
      },
      date: "N/A",
      status: true,
    };
    setPrescriptions([...prescriptions, newPrescription]);
  };

  // Delete prescription
  const deletePrescription = (id) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  // Toggle status
  const toggleStatus = (id) => {
    setPrescriptions(
      prescriptions.map((p) =>
        p.id === id ? { ...p, status: !p.status } : p
      )
    );
  };

  // Filter prescriptions
  const filteredData = prescriptions.filter((p) =>
    p.patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        marginTop: "60px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f4f7fa",
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="prescription-header" style={headerStyle}>
          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchStyle}
          />
          <div className="header-buttons">
            <button className="filter-btn" style={btnStyle}>
              <FaFilter />
            </button>
            <button
              className="new-prescription-btn"
              onClick={addPrescription}
              style={{ ...btnStyle, background: "#3b82f6", color: "#fff" }}
            >
              New Prescription
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <div className="table-head" style={headStyle}>
            <div>PATIENTS</div>
            <div>DOCTORS</div>
            <div>ADDED AT</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>

          {filteredData.map((p) => (
            <div
              key={p.id}
              className="table-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                background: p.id % 2 === 0 ? "#fff" : "#f9fafb",
              }}
            >
              {/* Patient */}
              <div className="patient-cell" style={cellFlex}>
                <div style={avatar}>{p.patient.initials}</div>
                <div>
                  <div className="patient-name">{p.patient.name}</div>
                  <div className="patient-email" style={{ fontSize: "12px" }}>
                    {p.patient.email}
                  </div>
                </div>
              </div>

              {/* Doctor */}
              <div className="doctor-cell" style={cellFlex}>
                <div style={{ ...avatar, background: "#06b6d4" }}>
                  {p.doctor.initials}
                </div>
                <div>
                  <div className="doctor-name">{p.doctor.name}</div>
                  <div className="doctor-email" style={{ fontSize: "12px" }}>
                    {p.doctor.email}
                  </div>
                </div>
              </div>

              <div>{p.date}</div>

              {/* Status */}
              <div>
                <input
                  type="checkbox"
                  checked={p.status}
                  onChange={() => toggleStatus(p.id)}
                />
              </div>

              {/* Action */}
              <div>
                <FaEye className="icon" style={icon} />
                <FaEdit className="icon" style={icon} />
                <FaPrint className="icon" style={icon} />
                <FaTrashAlt
                  className="icon"
                  style={{ ...icon, color: "red" }}
                  onClick={() => deletePrescription(p.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Small styles
const headerStyle = { display: "flex", justifyContent: "space-between", marginBottom: "20px" };
const searchStyle = { padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" };
const btnStyle = { padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer", marginLeft: "10px" };
const headStyle = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", fontWeight: "600", padding: "10px", background: "#e5e7eb" };
const cellFlex = { display: "flex", alignItems: "center", gap: "10px" };
const avatar = { width: "35px", height: "35px", borderRadius: "50%", background: "#3b82f6", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" };
const icon = { margin: "0 8px", cursor: "pointer" };

export default Prescriptions;
