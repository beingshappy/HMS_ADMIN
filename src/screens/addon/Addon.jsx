import React, { useState } from "react";
import { FaPuzzlePiece, FaEdit, FaTrash } from "react-icons/fa";

const Addon = ({ sidebarCollapsed }) => {
  // Initial data
  const initialAddons = [
    { id: 1, name: "Lab Reports", description: "Integration with lab systems", active: true },
    { id: 2, name: "Pharmacy Sync", description: "Pharmacy management addon", active: false },
    { id: 3, name: "Billing Pro", description: "Advanced billing features", active: true },
    { id: 4, name: "SMS Alerts", description: "Send SMS to patients", active: true },
    { id: 5, name: "Online Payment", description: "UPI & Card integration", active: false },
    { id: 6, name: "Doctor Portal", description: "Doctors login portal", active: true },
    { id: 7, name: "Insurance API", description: "Integration with insurance", active: false },
    { id: 8, name: "Queue Manager", description: "Manage patient queues", active: true },
  ];

  const [addons, setAddons] = useState(initialAddons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" | "edit"
  const [currentAddon, setCurrentAddon] = useState({ name: "", description: "", active: true });

  // Delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Pagination
  const totalPages = Math.ceil(addons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAddons = addons.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const toggleAddon = (id) => {
    setAddons((prev) =>
      prev.map((addon) => (addon.id === id ? { ...addon, active: !addon.active } : addon))
    );
  };

  const openAddModal = () => {
    setModalType("add");
    setCurrentAddon({ name: "", description: "", active: true });
    setShowModal(true);
  };

  const openEditModal = (addon) => {
    setModalType("edit");
    setCurrentAddon(addon);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!currentAddon.name) return alert("Name is required");
    if (modalType === "add") {
      const newAddon = { ...currentAddon, id: Date.now() };
      setAddons((prev) => [...prev, newAddon]);
    } else {
      setAddons((prev) =>
        prev.map((addon) => (addon.id === currentAddon.id ? currentAddon : addon))
      );
    }
    setShowModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setAddons((prev) => prev.filter((addon) => addon.id !== deleteId));
    setShowDeleteModal(false);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: "#2c3e50", fontWeight: 600 }}>Addon</h2>
          <p className="text-muted mb-0">Manage additional services and extensions.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPuzzlePiece className="me-2" /> Add New
        </button>
      </div>

      {/* Table */}
      <div className="card p-3 shadow-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAddons.map((addon) => (
              <tr key={addon.id}>
                <td>{addon.name}</td>
                <td>{addon.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={addon.active}
                    onChange={() => toggleAddon(addon.id)}
                  />
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(addon)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(addon.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-3" style={{ maxWidth: "400px", margin: "100px auto", background: "#fff", borderRadius: "12px" }}>
            <h5>{modalType === "add" ? "Add New Addon" : "Edit Addon"}</h5>
            <input
              type="text"
              placeholder="Name"
              value={currentAddon.name}
              onChange={(e) => setCurrentAddon({ ...currentAddon, name: e.target.value })}
              className="form-control my-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={currentAddon.description}
              onChange={(e) => setCurrentAddon({ ...currentAddon, description: e.target.value })}
              className="form-control my-2"
            />
            <div className="form-check form-switch my-2">
              <input
                type="checkbox"
                checked={currentAddon.active}
                onChange={(e) => setCurrentAddon({ ...currentAddon, active: e.target.checked })}
              /> Active
            </div>
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal-content p-3" style={{ maxWidth: "300px", margin: "100px auto", background: "#fff", borderRadius: "12px" }}>
            <p>Are you sure you want to delete this addon?</p>
            <div className="d-flex justify-content-end gap-2 mt-2">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addon;
