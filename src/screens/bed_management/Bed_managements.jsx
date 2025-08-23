import React, { useState } from "react";
import { FaBed, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

const Bed_managements = ({ sidebarCollapsed }) => {
  // Initial dummy data
  const initialBeds = [
    { id: 1, bedNo: "B101", type: "ICU", status: "Available", patient: "-" },
    { id: 2, bedNo: "B102", type: "General", status: "Occupied", patient: "Rahul" },
    { id: 3, bedNo: "B103", type: "ICU", status: "Available", patient: "-" },
    { id: 4, bedNo: "B104", type: "Private", status: "Occupied", patient: "Amit" },
    { id: 5, bedNo: "B105", type: "General", status: "Available", patient: "-" },
    { id: 6, bedNo: "B106", type: "ICU", status: "Occupied", patient: "Sneha" },
    { id: 7, bedNo: "B107", type: "General", status: "Available", patient: "-" },
    { id: 8, bedNo: "B108", type: "Private", status: "Occupied", patient: "Priya" },
    { id: 9, bedNo: "B109", type: "ICU", status: "Available", patient: "-" },
    { id: 10, bedNo: "B110", type: "General", status: "Occupied", patient: "Karan" },
  ];

  const [beds, setBeds] = useState(initialBeds);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBed, setEditingBed] = useState(null);
  const [formData, setFormData] = useState({
    bedNo: "",
    type: "General",
    status: "Available",
    patient: "-",
  });

  const bedsPerPage = 5;

  // Filtered and paginated beds
  const filteredBeds = beds.filter(
    (b) =>
      b.bedNo.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      b.patient.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * bedsPerPage;
  const indexOfFirst = indexOfLast - bedsPerPage;
  const currentBeds = filteredBeds.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBeds.length / bedsPerPage);

  // Add or Edit bed
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBed) {
      // Edit existing
      setBeds((prev) =>
        prev.map((b) => (b.id === editingBed.id ? { ...b, ...formData } : b))
      );
    } else {
      // Add new
      const newBed = { id: beds.length + 1, ...formData };
      setBeds((prev) => [...prev, newBed]);
    }
    setFormData({ bedNo: "", type: "General", status: "Available", patient: "-" });
    setEditingBed(null);
    setShowForm(false);
  };

  // Delete bed
  const handleDelete = (id) => {
    setBeds((prev) => prev.filter((b) => b.id !== id));
  };

  // Edit bed
  const handleEdit = (bed) => {
    setEditingBed(bed);
    setFormData({ ...bed });
    setShowForm(true);
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
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 style={{ color: "#2c3e50", fontWeight: "600" }}>Bed Management</h2>
            <p className="text-muted mb-0">
              Track, assign, and manage hospital beds efficiently.
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search beds or patients"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button
              className="btn btn-success d-flex align-items-center"
              onClick={() => {
                setShowForm(!showForm);
                setEditingBed(null);
                setFormData({ bedNo: "", type: "General", status: "Available", patient: "-" });
              }}
            >
              <FaBed className="me-2" /> {editingBed ? "Edit Bed" : "Add Bed"}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="card p-3 mb-3 shadow-sm bg-white rounded">
            <form
              className="d-flex gap-2 flex-wrap align-items-end"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Bed No"
                className="form-control"
                value={formData.bedNo}
                onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
                required
              />
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>General</option>
                <option>ICU</option>
                <option>Private</option>
              </select>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                    patient: e.target.value === "Available" ? "-" : formData.patient,
                  })
                }
              >
                <option>Available</option>
                <option>Occupied</option>
              </select>
              <input
                type="text"
                placeholder="Patient Name"
                className="form-control"
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                disabled={formData.status === "Available"}
                required={formData.status === "Occupied"}
              />
              <button type="submit" className="btn btn-primary">
                {editingBed ? "Update" : "Add"}
              </button>
            </form>
          </div>
        )}

        {/* Beds Table */}
        <div className="card p-4 border-0 shadow-sm" style={{ borderRadius: "12px" }}>
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Bed No</th>
                <th>Type</th>
                <th>Status</th>
                <th>Assigned Patient</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBeds.length > 0 ? (
                currentBeds.map((bed) => (
                  <tr key={bed.id}>
                    <td>{bed.bedNo}</td>
                    <td>{bed.type}</td>
                    <td>
                      <span
                        className={`badge ${
                          bed.status === "Available" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {bed.status}
                      </span>
                    </td>
                    <td>{bed.patient}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <FaEdit
                          style={{ cursor: "pointer", color: "#6f42c1" }}
                          onClick={() => handleEdit(bed)}
                        />
                        <FaTrash
                          style={{ cursor: "pointer", color: "#dc3545" }}
                          onClick={() => handleDelete(bed.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No beds found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <div>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn mx-1 ${
                    currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bed_managements;
