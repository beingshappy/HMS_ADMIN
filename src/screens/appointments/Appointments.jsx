import React, { useState } from "react";
import { FaCalendarCheck, FaRegEdit, FaCalendarAlt, FaFilter } from "react-icons/fa";

const initialAppointments = [
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Trith Shah", email: "tirth@gmail.com", initials: "TS", color: "#8b5cf6" },
    doctor: { name: "Ali Sahil", email: "alisahil@gmail.com", avatar: "👨‍⚕️" },
    department: "Allergists",
    time: "4:30 PM",
    date: "August 6, 2025",
    status: "Confirm"
  },
  {
    patient: { name: "Dsdsd Sdadsad", email: "eee@fff.com", initials: "DS", color: "#0ea5e9" },
    doctor: { name: "Test Doc DocDocDoc", email: "doctorrrr@example.com", initials: "TD", color: "#3b82f6" },
    department: "Surgical Department",
    time: "18:00",
    date: "August 5, 2025",
    status: "Confirm"
  },
  // Add more dummy data as needed
];

const Appointments = ({ sidebarCollapsed }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter by search
  const filtered = appointments.filter(
    (a) =>
      a.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentAppointments = filtered.slice(startIndex, startIndex + rowsPerPage);

  // Toggle status
  const toggleStatus = (index) => {
    const newAppointments = [...appointments];
    newAppointments[index].status =
      newAppointments[index].status === "Confirm" ? "Cancelled" : "Confirm";
    setAppointments(newAppointments);
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
        padding: "20px"
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ color: "#2c3e50", fontWeight: 600 }}>Appointments</h2>
          <p className="text-muted">Schedule and manage patient appointments.</p>
        </div>
        <button
          className="btn btn-info d-flex align-items-center"
          style={{ borderRadius: "8px" }}
          onClick={() => alert("Add new appointment")}
        >
          <FaCalendarCheck className="me-2" />
          New Appointment
        </button>
      </div>

      {/* Search & Filters */}
      <div className="d-flex align-items-center justify-content-between mb-3 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by patient, doctor, or department"
          style={{ width: "250px", borderRadius: "8px" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">
            <FaCalendarAlt />
          </button>
          <button className="btn btn-outline-secondary">
            <FaFilter />
          </button>
          <input
            type="text"
            className="form-control"
            defaultValue="08/03/2025 - 08/09/2025"
            style={{ width: "230px", borderRadius: "8px" }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>PATIENT</th>
              <th>DOCTOR</th>
              <th>DEPARTMENT</th>
              <th>DATE & TIME</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((item, i) => (
                <tr key={startIndex + i}>
                  {/* Patient */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center text-white"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: item.patient.color,
                          fontWeight: "bold"
                        }}
                      >
                        {item.patient.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.patient.name}</div>
                        <div className="text-muted" style={{ fontSize: "13px" }}>
                          {item.patient.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {item.doctor.avatar ? (
                        <span style={{ fontSize: "22px" }}>{item.doctor.avatar}</span>
                      ) : (
                        <div
                          className="rounded-circle d-flex justify-content-center align-items-center text-white"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: item.doctor.color,
                            fontWeight: "bold"
                          }}
                        >
                          {item.doctor.initials}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, color: "#6366f1" }}>
                          {item.doctor.name}
                        </div>
                        <div className="text-muted" style={{ fontSize: "13px" }}>
                          {item.doctor.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td>{item.department}</td>

                  {/* Date & Time */}
                  <td>
                    <div
                      className="bg-info text-white rounded px-3 py-1 text-center"
                      style={{ display: "inline-block" }}
                    >
                      <div>{item.time}</div>
                      <div style={{ fontSize: "13px" }}>{item.date}</div>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Confirm" ? "bg-success" : "bg-danger"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleStatus(startIndex + i)}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
                    <FaRegEdit
                      style={{ cursor: "pointer", color: "#6366f1", fontSize: "18px" }}
                      onClick={() => alert("Edit appointment")}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-3">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>

        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`btn btn-sm mx-1 ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Appointments;
