import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Documents = ({ sidebarCollapsed }) => {
  const [data, setData] = useState([
    "Birthd",
    "Ghana card",
    "Gg",
    "BIRTH CERTIFICATE",
    "HJHHKJ",
    "admin",
    "Ayaan Shah",
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [docName, setDocName] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered data
  const filteredData = data.filter((doc) =>
    doc.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleSave = () => {
    if (docName.trim() === "") return;

    if (editIndex !== null) {
      // Update existing
      const updated = [...data];
      updated[editIndex] = docName;
      setData(updated);
    } else {
      // Add new
      setData([...data, docName]);
    }

    setDocName("");
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setDocName(data[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f4f7fa",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div className="document-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div className="search-container" style={{ display: "flex", alignItems: "center", background: "#fff", padding: "5px 10px", borderRadius: "6px", width: "250px" }}>
          <FaSearch className="search-icon" style={{ marginRight: "8px" }} />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            style={{ border: "none", outline: "none", flex: 1 }}
          />
        </div>
        <button
          className="new-doc-btn"
          onClick={() => {
            setDocName("");
            setEditIndex(null);
            setShowModal(true);
          }}
          style={{
            background: "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FaPlus /> New Document Type
        </button>
      </div>

      {/* Table */}
      <div className="document-table" style={{ background: "#fff", borderRadius: "8px", overflow: "hidden" }}>
        <div className="table-header" style={{ display: "flex", justifyContent: "space-between", background: "#2c3e50", color: "#fff", padding: "12px 20px", fontWeight: "600" }}>
          <span>DOCUMENT TYPE</span>
          <span>ACTION</span>
        </div>

        {paginatedData.map((doc, index) => (
          <div
            className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 20px",
              background: index % 2 === 0 ? "#f9f9f9" : "#fff",
              borderBottom: "1px solid #ddd",
            }}
          >
            <span className="doc-name">{doc}</span>
            <span className="actions" style={{ display: "flex", gap: "15px" }}>
              <FaEdit
                className="edit-icon"
                style={{ cursor: "pointer", color: "green" }}
                onClick={() => handleEdit((currentPage - 1) * itemsPerPage + index)}
              />
              <FaTrash
                className="delete-icon"
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete((currentPage - 1) * itemsPerPage + index)}
              />
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: "4px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: currentPage === i + 1 ? "#3498db" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: "4px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex", justifyContent: "center", alignItems: "center",
          }}
        >
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "400px" }}>
            <h3 style={{ marginBottom: "15px" }}>{editIndex !== null ? "Edit Document" : "Add New Document"}</h3>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Enter document name"
              style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "8px 12px", background: "#ccc", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{ padding: "8px 12px", background: "#3498db", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
