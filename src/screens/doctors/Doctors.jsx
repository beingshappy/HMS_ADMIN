import React, { useState } from "react";
import { FaUserMd, FaEdit, FaTrash } from "react-icons/fa";

const Doctors = ({ sidebarCollapsed }) => {
  const [doctors, setDoctors] = useState([
    { name: "Fewfewf Fwerfwe", email: "text@gmail.com", specialist: "Bones", qualification: "N/A" },
    { name: "Jeremi POATY", email: "jeremikibassapoaty@gmail.com", specialist: "Bones", qualification: "N/A" },
    { name: "Andres Calamaro", email: "calamaro@gmail.com", specialist: "Alergias", qualification: "Bueno" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", specialist: "", qualification: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Open popup
  const handleOpen = (doctor = null, index = null) => {
    if (doctor) {
      setFormData(doctor);
      setEditIndex(index);
    } else {
      setFormData({ name: "", email: "", specialist: "", qualification: "" });
      setEditIndex(null);
    }
    setShowPopup(true);
  };

  // Close popup
  const handleClose = () => setShowPopup(false);

  // Save doctor (add/edit)
  const handleSave = () => {
    if (!formData.name.trim()) return alert("Name is required!");
    if (editIndex !== null) {
      const updated = [...doctors];
      updated[editIndex] = formData;
      setDoctors(updated);
    } else {
      setDoctors([...doctors, formData]);
    }
    setShowPopup(false);
  };

  // Delete doctor
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((_, i) => i !== index));
    }
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "120px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 style={{ color: "#2c3e50", fontWeight: "600" }}>Doctors</h2>
            <p className="text-muted">View and manage all doctors associated with the hospital.</p>
          </div>
          <button className="btn-primary-custom" onClick={() => handleOpen()}>
            <FaUserMd className="me-2" />
            New Doctor
          </button>
        </div>

        {/* Doctor Table */}
        <div className="table-wrapper">
          <div className="table-header">
            <div>DOCTOR</div>
            <div>SPECIALIST</div>
            <div>QUALIFICATION</div>
            <div>ACTION</div>
          </div>

          {doctors.map((doc, idx) => (
            <div key={idx} className="table-row">
              <div className="doc-info">
                <div className="avatar">
                  {doc.name ? doc.name.charAt(0).toUpperCase() + (doc.name.split(" ")[1]?.charAt(0).toUpperCase() || "") : "DR"}
                </div>
                <div>
                  <div className="name">{doc.name}</div>
                  <div className="email">{doc.email}</div>
                </div>
              </div>
              <div>{doc.specialist}</div>
              <div>{doc.qualification}</div>
              <div className="action-icons">
                <FaEdit className="edit-icon" onClick={() => handleOpen(doc, idx)} />
                <FaTrash className="delete-icon" onClick={() => handleDelete(idx)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              width: "400px",
              padding: "25px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>
              {editIndex !== null ? "Edit Doctor" : "Add Doctor"}
            </h3>

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Specialist"
              value={formData.specialist}
              onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              style={inputStyle}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
              <button onClick={handleClose} className="btn-secondary-custom">Cancel</button>
              <button onClick={handleSave} className="btn-primary-custom">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

export default Doctors;
