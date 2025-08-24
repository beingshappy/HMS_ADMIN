import React, { useState, useEffect } from "react";
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
        width: "42px",
        height: "22px",
        borderRadius: "20px",
        backgroundColor: checked ? "#4caf50" : "#ccc",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        margin: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "22px" : "3px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          transition: "left 0.3s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
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

  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
  }, []);

  // Filter
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
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
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
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
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        marginTop: "45px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f8f9fa",
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0px)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div style={{ padding: "0 20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ color: "#2c3e50", fontWeight: "600", margin: 0 }}>Patient Smart Cards</h2>
            <p style={{ color: "#6c757d", margin: 0 }}>
              Issue and manage patient smart cards efficiently.
            </p>
          </div>
          <button
            onClick={handleAdd}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#007bff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontWeight: "500",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.3s ease",
              marginTop: "10px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaIdCard style={{ marginRight: "8px" }} /> Add New Patient Smart Card
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search patient smart cards..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            maxWidth: "300px",
            borderRadius: "8px",
            padding: "10px 15px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            width: "100%",
          }}
        />

        {/* Table */}
        <div
          style={{
            borderRadius: "12px",
            overflowX: "auto",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "all 0.5s ease",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f1f3f5" }}>
              <tr>
                <th
                  style={{ padding: "12px", cursor: "pointer" }}
                  onClick={() => requestSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                <th
                  style={{ padding: "12px", cursor: "pointer" }}
                  onClick={() => requestSort("color")}
                >
                  Color{" "}
                  {sortConfig.key === "color"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
                {[...Array(6)].map((_, i) => (
                  <th key={i} style={{ padding: "12px", textAlign: "center" }}>
                    Switch {i + 1}
                  </th>
                ))}
                <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    transition: "background 0.3s ease, opacity 0.5s ease, transform 0.5s ease",
                    opacity: fade ? 1 : 0,
                    transform: fade ? "translateY(0px)" : "translateY(10px)",
                    transitionDelay: `${index * 0.1}s`, // row by row delay
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "10px" }}>{item.name}</td>
                  <td style={{ padding: "10px" }}>
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
                    <td key={i} style={{ textAlign: "center", padding: "10px" }}>
                      <ToggleSwitch defaultChecked={true} />
                    </td>
                  ))}
                  <td style={{ textAlign: "center", padding: "10px" }}>
                    <FaEdit
                      style={{
                        color: "#007bff",
                        cursor: "pointer",
                        marginRight: "12px",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      onClick={() => alert(`Edit ${item.name}`)}
                    />
                    <FaTrash
                      style={{
                        color: "#dc3545",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      onClick={() => handleDelete(item.name)}
                    />
                  </td>
                </tr>
              ))}
              {currentRows.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={{ textAlign: "center", color: "#6c757d", padding: "15px" }}
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <nav>
              <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
                <li>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{
                      margin: "0 5px",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: "1px solid #007bff",
                      background: currentPage === 1 ? "#ccc" : "#007bff",
                      color: "#fff",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      transition: "transform 0.2s",
                    }}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        margin: "0 5px",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: "1px solid #007bff",
                        background: currentPage === i + 1 ? "#007bff" : "#fff",
                        color: currentPage === i + 1 ? "#fff" : "#007bff",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                      margin: "0 5px",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: "1px solid #007bff",
                      background: currentPage === totalPages ? "#ccc" : "#007bff",
                      color: "#fff",
                      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                      transition: "transform 0.2s",
                    }}
                  >
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
