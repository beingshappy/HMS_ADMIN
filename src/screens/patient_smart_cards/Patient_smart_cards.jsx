import React, { useState } from "react";
import { FaIdCard, FaEdit, FaTrash } from "react-icons/fa";

const mockData = [
  { name: "Test to Image", color: "#000000" },
  { name: "brand", color: "#000000" },
  { name: "appsums", color: "#0000FF" },
  { name: "علي احمد", color: "#FF0000" },
  { name: "Jayme Kirby", color: "#FF0000" },
  { name: "احمد شوقي", color: "#000000" },
  { name: "News1122", color: "#800080" },
  { name: "User 1", color: "#4caf50" },
  { name: "User 2", color: "#2196f3" },
  { name: "User 3", color: "#ff9800" },
  { name: "User 4", color: "#9c27b0" },
  { name: "User 5", color: "#e91e63" },
];

const ToggleSwitch = ({ defaultChecked = true }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      onClick={() => setChecked(!checked)}
      style={{
        width: "40px",
        height: "20px",
        borderRadius: "20px",
        backgroundColor: checked ? "#4caf50" : "#ccc",
        position: "relative",
        cursor: "pointer",
        transition: "0.3s",
        margin: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "22px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          transition: "0.3s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};

const PatientSmartCards = ({ sidebarCollapsed }) => {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const rowsPerPage = 5;

  // Filter by search
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort filtered data
  let sortedData = [...filteredData];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setData(data.filter((item) => item.name !== name));
    }
  };

  const handleAdd = () => {
    const newName = prompt("Enter patient name:");
    if (newName) setData([{ name: newName, color: "#000000" }, ...data]);
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
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1" style={{ color: "#2c3e50", fontWeight: "600" }}>
              Patient Smart Cards
            </h2>
            <p className="text-muted mb-0">Issue and manage patient smart cards efficiently.</p>
          </div>
          <button
            className="btn btn-primary d-flex align-items-center"
            style={{ borderRadius: "8px", padding: "10px 20px", fontWeight: 500 }}
            onClick={handleAdd}
          >
            <FaIdCard className="me-2" />
            Add New Patient Smart Card
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="🔍 Search patient smart cards..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ maxWidth: "300px", borderRadius: "8px", padding: "10px 15px" }}
        />

        {/* Table */}
        <div
          className="table-responsive shadow-sm"
          style={{ borderRadius: "12px", overflow: "hidden", background: "#fff" }}
        >
          <table className="table table-bordered align-middle mb-0">
            <thead style={{ background: "#f1f3f5" }}>
              <tr>
                <th style={{ cursor: "pointer" }} onClick={() => requestSort("name")}>
                  Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => requestSort("color")}>
                  Color {sortConfig.key === "color" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                </th>
                {[...Array(6)].map((_, i) => (
                  <th key={i}>Switch {i + 1}</th>
                ))}
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        backgroundColor: item.color,
                        border: "1px solid #ddd",
                      }}
                    />
                  </td>
                  {[...Array(6)].map((_, i) => (
                    <td key={i}>
                      <ToggleSwitch defaultChecked={true} />
                    </td>
                  ))}
                  <td style={{ textAlign: "center" }}>
                    <FaEdit
                      style={{ color: "#007bff", cursor: "pointer", marginRight: "12px" }}
                      onClick={() => alert(`Edit ${item.name}`)}
                    />
                    <FaTrash
                      style={{ color: "#dc3545", cursor: "pointer" }}
                      onClick={() => handleDelete(item.name)}
                    />
                  </td>
                </tr>
              ))}
              {currentRows.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-3">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSmartCards;
