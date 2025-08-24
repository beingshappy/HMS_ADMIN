import React, { useMemo, useState } from "react";
import { FaMicroscope, FaPrint, FaEdit, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

/** ---------- Helpers ---------- **/
const randFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const colorPool = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7"];
const makeInitials = (fullName = "") =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("") || "NA";

const formatDateForInput = (dStr) => {
  // Accepts "24th Jul,2025" or ISO-like inputs; returns yyyy-mm-dd for <input type="date">
  const d = new Date(dStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};
const formatDateDisplay = (value) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value || "N/A";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};
const genReportNo = () =>
  Math.random().toString(36).slice(2, 6).toUpperCase() +
  Math.random().toString(36).slice(2, 4).toUpperCase();

/** ---------- Component ---------- **/
const Diagnosis = ({ sidebarCollapsed }) => {
  const [rows, setRows] = useState([
    {
      report: "FOO2AERZ",
      patient: { name: "Hamza Ndauka", email: "ndauka@example.com", color: "#ff6b6b" },
      doctor: { name: "Harish Mohan", email: "vatsal@gmail.com" },
      category: "Blood and Blood Forming Organs and Immunological Disorders",
      date: "2025-07-24",
    },
    {
      report: "NZ3LAANF",
      patient: { name: "Amit Kumar", email: "rohido.eriguh@jollyfree.com", color: "#8e44ad" },
      doctor: { name: "Harish Mohan", email: "vatsal@gmail.com" },
      category: "HB Test",
      date: "2025-07-12",
    },
  ]);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Add/Edit modal state
  const blankForm = {
    report: "",
    patientName: "",
    patientEmail: "",
    doctorName: "",
    doctorEmail: "",
    category: "",
    date: "",
  };
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(blankForm);

  // View modal state
  const [viewRow, setViewRow] = useState(null);

  /** ---------- Derived data ---------- **/
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      return (
        r.report.toLowerCase().includes(q) ||
        r.patient.name.toLowerCase().includes(q) ||
        r.patient.email.toLowerCase().includes(q) ||
        r.doctor.name.toLowerCase().includes(q) ||
        r.doctor.email.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        formatDateDisplay(r.date).toLowerCase().includes(q)
      );
    });
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const paged = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  /** ---------- Handlers ---------- **/
  const openAdd = () => {
    setEditingIndex(null);
    setForm(blankForm);
    setShowForm(true);
  };
  const openEdit = (idx) => {
    const r = rows[idx];
    setEditingIndex(idx);
    setForm({
      report: r.report,
      patientName: r.patient.name,
      patientEmail: r.patient.email,
      doctorName: r.doctor.name,
      doctorEmail: r.doctor.email,
      category: r.category,
      date: r.date, // already yyyy-mm-dd
    });
    setShowForm(true);
  };
  const closeForm = () => setShowForm(false);

  const saveForm = () => {
    // basic validation
    const required = ["patientName", "patientEmail", "doctorName", "category", "date"];
    const missing = required.filter((k) => !form[k]?.trim());
    if (missing.length) {
      alert(`Please fill: ${missing.join(", ")}`);
      return;
    }
    const newRow = {
      report: form.report?.trim() || genReportNo(),
      patient: {
        name: form.patientName.trim(),
        email: form.patientEmail.trim(),
        color: randFrom(colorPool),
      },
      doctor: {
        name: form.doctorName.trim(),
        email: form.doctorEmail.trim() || "",
      },
      category: form.category.trim(),
      date: form.date, // yyyy-mm-dd
    };

    setRows((prev) => {
      if (editingIndex !== null) {
        const clone = [...prev];
        clone[editingIndex] = newRow;
        return clone;
      }
      return [...prev, newRow];
    });
    setShowForm(false);
  };

  const delRow = (idx) => {
    const r = rows[idx];
    if (!window.confirm(`Delete report ${r.report} for ${r.patient.name}?`)) return;
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const viewDetails = (row) => setViewRow(row);
  const closeView = () => setViewRow(null);

  const printRow = (row) => {
    const w = window.open("", "_blank");
    if (!w) return;
    const html = `
      <html>
        <head>
          <title>Diagnosis Report ${row.report}</title>
          <style>
            body{font-family:Arial, sans-serif; padding:24px;}
            h1{margin:0 0 12px;}
            .section{margin:12px 0; padding:12px; border:1px solid #e5e7eb; border-radius:8px;}
            .label{font-weight:bold;}
            .badge{display:inline-block; padding:6px 10px; border-radius:6px; background:#eef2ff; color:#3730a3; font-weight:600;}
          </style>
        </head>
        <body>
          <h1>Diagnosis Report <span class="badge">${row.report}</span></h1>
          <div class="section">
            <div><span class="label">Patient:</span> ${row.patient.name} (${row.patient.email || "-"})</div>
            <div><span class="label">Doctor:</span> ${row.doctor.name} (${row.doctor.email || "-"})</div>
            <div><span class="label">Category:</span> ${row.category}</div>
            <div><span class="label">Date:</span> ${formatDateDisplay(row.date)}</div>
          </div>
          <p>Generated from Diagnosis module.</p>
          <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 300); };</script>
        </body>
      </html>
    `;
    w.document.write(html);
    w.document.close();
  };

  /** ---------- Styles (inline for one-file drop-in) ---------- **/
  const S = {
    main: {
      marginLeft: sidebarCollapsed ? "70px" : "250px",
      paddingTop: "80px",
      marginTop: "60px",
      transition: "margin-left 0.3s ease-in-out",
      minHeight: "calc(100vh - 60px)",
      backgroundColor: "#f8f9fa",
    },
    container: { padding: "0 1.5rem" },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      gap: 12,
      flexWrap: "wrap",
    },
    h2: { color: "#2c3e50", fontWeight: 600, margin: 0 },
    sub: { margin: 0, color: "#6b7280" },
    btnPrimary: {
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
    },
    searchWrap: { display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" },
    search: {
      flex: "1 1 280px",
      maxWidth: 480,
      borderRadius: 10,
      border: "1px solid #d1d5db",
      padding: "10px 12px",
      background: "#fff",
      outline: "none",
    },
    tableWrap: {
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      overflow: "hidden",
    },
    table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
    thead: { background: "#f3f4f6" },
    th: { textAlign: "left", padding: "12px 14px", fontWeight: 700, color: "#374151", fontSize: 14 },
    td: { padding: "12px 14px", borderTop: "1px solid #f3f4f6", verticalAlign: "middle", fontSize: 14, color: "#111827" },
    badge: {
      display: "inline-block",
      background: "#eef2ff",
      color: "#3730a3",
      padding: "6px 10px",
      borderRadius: 8,
      fontWeight: 700,
      fontSize: 12,
    },
    patientCell: { display: "flex", alignItems: "center", gap: 10 },
    avatar: (bg) => ({
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      color: "#fff",
      fontWeight: 700,
      background: bg || randFrom(colorPool),
      userSelect: "none",
      fontSize: 14,
    }),
    name: { fontWeight: 700 },
    email: { color: "#6b7280", fontSize: 12 },
    actionRow: { display: "flex", gap: 12, alignItems: "center" },
    iconBtn: { cursor: "pointer" },
    pagBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 14px",
      background: "#fff",
      borderRadius: 12,
      marginTop: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      gap: 12,
      flexWrap: "wrap",
    },
    pagerBtn: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #e5e7eb",
      background: "#fff",
      cursor: "pointer",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "grid",
      placeItems: "center",
      zIndex: 1000,
      padding: 12,
    },
    modal: {
      width: "100%",
      maxWidth: 640,
      background: "#fff",
      borderRadius: 14,
      padding: 16,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    },
    modalTitle: { margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 },
    input: {
      width: "100%",
      border: "1px solid #d1d5db",
      padding: "10px 12px",
      borderRadius: 10,
      outline: "none",
      background: "#fff",
    },
    modalActions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 },
    btnSecondary: {
      background: "#e5e7eb",
      color: "#111827",
      border: "none",
      padding: "10px 16px",
      borderRadius: 10,
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  return (
    <div className="main-content" style={S.main}>
      <div className="container-fluid" style={S.container}>
        {/* Header */}
        <div style={S.header}>
          <div>
            <h2 style={S.h2}>Diagnosis</h2>
            <p style={S.sub}>Manage diagnosis reports and lab tests.</p>
          </div>
          <button style={S.btnPrimary} onClick={openAdd}>
            <FaMicroscope /> New Patient Diagnosis Test
          </button>
        </div>

        {/* Search + page size */}
        <div style={S.searchWrap}>
          <input
            style={S.search}
            placeholder="Search by report, patient, doctor, category, date..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <div>
            <label style={{ marginRight: 8, color: "#6b7280" }}>Rows:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              style={{ ...S.input, width: 90, padding: "8px 10px" }}
            >
              {[5, 8, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead style={S.thead}>
              <tr>
                <th style={S.th}>Report Number</th>
                <th style={S.th}>Patient</th>
                <th style={S.th}>Doctor</th>
                <th style={S.th}>Diagnosis Category</th>
                <th style={S.th}>Created On</th>
                <th style={S.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td style={S.td} colSpan={6}>
                    No results.
                  </td>
                </tr>
              ) : (
                paged.map((item, idx) => {
                  const globalIndex = (pageSafe - 1) * pageSize + idx;
                  return (
                    <tr key={item.report + idx}>
                      <td style={S.td}>
                        <span style={S.badge}>{item.report}</span>
                      </td>

                      <td style={S.td}>
                        <div style={S.patientCell}>
                          <div style={S.avatar(item.patient.color)}>{makeInitials(item.patient.name)}</div>
                          <div>
                            <div style={S.name}>{item.patient.name}</div>
                            <div style={S.email}>{item.patient.email}</div>
                          </div>
                        </div>
                      </td>

                      <td style={S.td}>
                        <div style={S.patientCell}>
                          <div style={S.avatar("#9ca3af")}>{makeInitials(item.doctor.name)}</div>
                          <div>
                            <div style={S.name}>{item.doctor.name}</div>
                            <div style={S.email}>{item.doctor.email}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ ...S.td, maxWidth: 360 }}>{item.category}</td>

                      <td style={S.td}>
                        <span style={S.badge}>{formatDateDisplay(item.date)}</span>
                      </td>

                      <td style={{ ...S.td }}>
                        <div style={S.actionRow}>
                          <FaPrint title="Print" style={S.iconBtn} onClick={() => printRow(item)} />
                          <FiExternalLink title="View" style={S.iconBtn} onClick={() => viewDetails(item)} />
                          <FaEdit title="Edit" style={S.iconBtn} onClick={() => openEdit(globalIndex)} />
                          <FaTrash
                            title="Delete"
                            style={{ ...S.iconBtn, color: "#e74c3c" }}
                            onClick={() => delRow(globalIndex)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div style={S.pagBar}>
          <div style={{ color: "#6b7280" }}>
            Showing{" "}
            <strong>
              {filtered.length === 0
                ? 0
                : (pageSafe - 1) * pageSize + 1}-
              {Math.min(pageSafe * pageSize, filtered.length)}
            </strong>{" "}
            of <strong>{filtered.length}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              style={S.pagerBtn}
              disabled={pageSafe <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span style={{ minWidth: 70, textAlign: "center" }}>
              Page <strong>{pageSafe}</strong> / {totalPages}
            </span>
            <button
              style={S.pagerBtn}
              disabled={pageSafe >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div style={S.modalOverlay} onClick={closeForm}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={S.modalTitle}>{editingIndex !== null ? "Edit Diagnosis" : "New Diagnosis"}</h3>
            <div style={S.formGrid}>
              <input
                style={S.input}
                placeholder="Report No. (auto if empty)"
                value={form.report}
                onChange={(e) => setForm({ ...form, report: e.target.value })}
              />
              <input
                style={S.input}
                placeholder="Diagnosis Category *"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                style={S.input}
                placeholder="Patient Name *"
                value={form.patientName}
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              />
              <input
                style={S.input}
                type="email"
                placeholder="Patient Email *"
                value={form.patientEmail}
                onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
              />
              <input
                style={S.input}
                placeholder="Doctor Name *"
                value={form.doctorName}
                onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              />
              <input
                style={S.input}
                type="email"
                placeholder="Doctor Email"
                value={form.doctorEmail}
                onChange={(e) => setForm({ ...form, doctorEmail: e.target.value })}
              />
              <input
                style={S.input}
                type="date"
                placeholder="Date *"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              {/* spacer */}
              <div />
            </div>
            <div style={S.modalActions}>
              <button style={S.btnSecondary} onClick={closeForm}>
                Cancel
              </button>
              <button style={S.btnPrimary} onClick={saveForm}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {!!viewRow && (
        <div style={S.modalOverlay} onClick={closeView}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={S.modalTitle}>Diagnosis Details</h3>
            <div className="view-grid" style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <div><strong>Report:</strong> {viewRow.report}</div>
              <div><strong>Patient:</strong> {viewRow.patient.name} ({viewRow.patient.email || "-"})</div>
              <div><strong>Doctor:</strong> {viewRow.doctor.name} ({viewRow.doctor.email || "-"})</div>
              <div><strong>Category:</strong> {viewRow.category}</div>
              <div><strong>Date:</strong> {formatDateDisplay(viewRow.date)}</div>
            </div>
            <div style={S.modalActions}>
              <button style={S.btnSecondary} onClick={closeView}>
                Close
              </button>
              <button style={S.btnPrimary} onClick={() => printRow(viewRow)}>
                <FaPrint /> Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diagnosis;
