import React, { useState } from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";

const initialData = [
  {
    patient: {
      name: "Noor Ahmed Shawqi",
      email: "ah700342030@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    doctor: {
      name: "Dr. Parag Patil",
      email: "demos@softaculous.com",
      initials: "DP",
      color: "#38bdf8",
    },
  },
  {
    patient: {
      name: "5445 43534544354",
      email: "fdgdfg@tgg.gh",
      initials: "54",
      color: "#ef4444",
    },
    doctor: {
      name: "Aya Hasan",
      email: "ayaalsoreky@gmail.com",
      initials: "AH",
      color: "#f87171",
    },
  },
];

const Odontograms = ({ sidebarCollapsed }) => {
  const [odontograms, setOdontograms] = useState(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const filteredData = odontograms.filter(
    (item) =>
      item.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      item.patient.email.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Add Odontogram
  const handleAdd = () => {
    const patientName = prompt("Enter patient name:");
    const patientEmail = prompt("Enter patient email:");
    const doctorName = prompt("Enter doctor name:");
    const doctorEmail = prompt("Enter doctor email:");

    if (patientName && patientEmail && doctorName && doctorEmail) {
      const newData = {
        patient: { name: patientName, email: patientEmail },
        doctor: { name: doctorName, email: doctorEmail },
      };
      setOdontograms([newData, ...odontograms]);
      setCurrentPage(1);
    }
  };

  // Edit Odontogram
  const handleEdit = (index) => {
    const item = paginatedData[index];
    const patientName = prompt("Edit patient name:", item.patient.name);
    const patientEmail = prompt("Edit patient email:", item.patient.email);
    const doctorName = prompt("Edit doctor name:", item.doctor.name);
    const doctorEmail = prompt("Edit doctor email:", item.doctor.email);

    if (patientName && patientEmail && doctorName && doctorEmail) {
      const globalIndex = odontograms.indexOf(item);
      const updated = [...odontograms];
      updated[globalIndex] = {
        patient: { name: patientName, email: patientEmail },
        doctor: { name: doctorName, email: doctorEmail },
      };
      setOdontograms(updated);
    }
  };

  // Delete Odontogram
  const handleDelete = (index) => {
    const item = paginatedData[index];
    if (window.confirm("Delete this record?")) {
      setOdontograms(odontograms.filter((o) => o !== item));
    }
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        marginTop: "45px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f1f5f9",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        className="odontogram-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <button
          className="add-btn"
          onClick={handleAdd}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Odontogram
        </button>
      </div>

      {/* Table */}
      <div
        className="odontogram-table"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 120px",
            fontWeight: "600",
            padding: "12px 15px",
            borderBottom: "2px solid #e5e7eb",
          }}
        >
          <span>Patient</span>
          <span>Doctor</span>
          <span style={{ textAlign: "center" }}>Action</span>
        </div>

        {paginatedData.length > 0 ? (
          paginatedData.map((item, index) => (
            <div
              key={index}
              className="table-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 120px",
                alignItems: "center",
                padding: "12px 15px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div>
                <strong>{item.patient.name}</strong>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.patient.email}</div>
              </div>
              <div>
                <strong>{item.doctor.name}</strong>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.doctor.email}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <FaEdit
                  style={{ color: "#2563eb", cursor: "pointer" }}
                  onClick={() => handleEdit(index)}
                />
                <FaTrash
                  style={{ color: "#dc2626", cursor: "pointer" }}
                  onClick={() => handleDelete(index)}
                />
                <FaPrint
                  style={{ color: "#16a34a", cursor: "pointer" }}
                  onClick={() => alert("Print clicked")}
                />
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
            No matching records found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "8px" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              backgroundColor: currentPage === 1 ? "#e5e7eb" : "#fff",
            }}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "6px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: currentPage === i + 1 ? "#2563eb" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              backgroundColor: currentPage === totalPages ? "#e5e7eb" : "#fff",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Odontograms;
