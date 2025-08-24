import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";

const initialData = [
  {
    patient: {
      name: "Noor Ahmed Shawqi",
      email: "ah700342030@gmail.com",
    },
    doctor: {
      name: "Dr. Parag Patil",
      email: "demos@softaculous.com",
    },
  },
  {
    patient: {
      name: "5445 43534544354",
      email: "fdgdfg@tgg.gh",
    },
    doctor: {
      name: "Aya Hasan",
      email: "ayaalsoreky@gmail.com",
    },
  },
];

const Odontograms = ({ sidebarCollapsed }) => {
  const [odontograms, setOdontograms] = useState(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rowsPerPage = 6;

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Add
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

  // Edit
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

  // Delete
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
        marginTop: "70px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f1f5f9",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
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
            width: isMobile ? "100%" : "250px",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Add Odontogram
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        {!isMobile && (
          <div
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
        )}

        {/* Rows */}
        {paginatedData.length > 0 ? (
          paginatedData.map((item, index) => (
            <div
              key={index}
              style={{
                display: isMobile ? "block" : "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 120px",
                alignItems: "center",
                padding: "12px 15px",
                borderBottom: "1px solid #e5e7eb",
                animation: "fadeIn 0.5s ease",
              }}
            >
              <div style={{ marginBottom: isMobile ? "8px" : "0" }}>
                <strong>{item.patient.name}</strong>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {item.patient.email}
                </div>
              </div>
              <div style={{ marginBottom: isMobile ? "8px" : "0" }}>
                <strong>{item.doctor.name}</strong>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  {item.doctor.email}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : "center",
                  gap: "10px",
                }}
              >
                <FaEdit
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onClick={() => handleEdit(index)}
                />
                <FaTrash
                  style={{
                    color: "#dc2626",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onClick={() => handleDelete(index)}
                />
                <FaPrint
                  style={{
                    color: "#16a34a",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
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
