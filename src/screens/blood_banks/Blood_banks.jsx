import React, { useState } from "react";

const Blood_banks = ({ sidebarCollapsed }) => {
  const initialData = [
    { id: 1, patient: { name: "Ahmed Shawqi", email: "ah7eeeee30@gmail.com" }, doctor: { name: "Aarav Singh", email: "aarav@gmail.com" }, donor: "Ahmed", issueTime: "01:47 AM", issueDate: "9th Jul, 2025", bloodGroup: "O +ve", amount: "$2.00" },
    { id: 2, patient: { name: "Rohit Sharma", email: "rohit@gmail.com" }, doctor: { name: "Dr. Mehta", email: "mehta@gmail.com" }, donor: "Suresh", issueTime: "10:15 PM", issueDate: "5th Aug, 2025", bloodGroup: "A -ve", amount: "$3.50" },
    { id: 3, patient: { name: "Priya Singh", email: "priya@gmail.com" }, doctor: { name: "Dr. Kiran", email: "kiran@gmail.com" }, donor: "Ravi", issueTime: "02:30 PM", issueDate: "18th Jun, 2025", bloodGroup: "B +ve", amount: "$4.00" },
  ];

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    patientName: "", patientEmail: "", doctorName: "", doctorEmail: "", donor: "", issueTime: "", issueDate: "", bloodGroup: "", amount: ""
  });

  const rowsPerPage = 5;

  // Filtered & Paginated
  const filteredData = data.filter(item =>
    item.patient.name.toLowerCase().includes(search.toLowerCase()) ||
    item.patient.email.toLowerCase().includes(search.toLowerCase()) ||
    item.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    item.donor.toLowerCase().includes(search.toLowerCase()) ||
    item.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSubmit = e => {
    e.preventDefault();
    const newRow = {
      id: editingRow ? editingRow.id : data.length + 1,
      patient: { name: formData.patientName, email: formData.patientEmail },
      doctor: { name: formData.doctorName, email: formData.doctorEmail },
      donor: formData.donor,
      issueTime: formData.issueTime,
      issueDate: formData.issueDate,
      bloodGroup: formData.bloodGroup,
      amount: formData.amount
    };
    if (editingRow) {
      setData(prev => prev.map(d => d.id === editingRow.id ? newRow : d));
    } else {
      setData(prev => [...prev, newRow]);
    }
    setShowForm(false);
    setEditingRow(null);
    setFormData({ patientName: "", patientEmail: "", doctorName: "", doctorEmail: "", donor: "", issueTime: "", issueDate: "", bloodGroup: "", amount: "" });
  };

  const handleEdit = row => {
    setEditingRow(row);
    setFormData({
      patientName: row.patient.name,
      patientEmail: row.patient.email,
      doctorName: row.doctor.name,
      doctorEmail: row.doctor.email,
      donor: row.donor,
      issueTime: row.issueTime,
      issueDate: row.issueDate,
      bloodGroup: row.bloodGroup,
      amount: row.amount
    });
    setShowForm(true);
  };

  const handleDelete = id => setData(prev => prev.filter(d => d.id !== id));

  return (
    <div className="main-content" style={{ marginLeft: sidebarCollapsed ? "70px" : "250px", paddingTop: "80px", marginTop: "20px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <input type="text" placeholder="Search" className="form-control" style={{ maxWidth: "300px", borderRadius: "8px" }} value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-danger" onClick={() => { setShowForm(!showForm); setEditingRow(null); }}>New Blood Issue</button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card p-3 mb-3 shadow-sm rounded">
            <form className="d-flex gap-2 flex-wrap" onSubmit={handleSubmit}>
              <input type="text" placeholder="Patient Name" className="form-control" required value={formData.patientName} onChange={e => setFormData({ ...formData, patientName: e.target.value })} />
              <input type="email" placeholder="Patient Email" className="form-control" required value={formData.patientEmail} onChange={e => setFormData({ ...formData, patientEmail: e.target.value })} />
              <input type="text" placeholder="Doctor Name" className="form-control" required value={formData.doctorName} onChange={e => setFormData({ ...formData, doctorName: e.target.value })} />
              <input type="email" placeholder="Doctor Email" className="form-control" required value={formData.doctorEmail} onChange={e => setFormData({ ...formData, doctorEmail: e.target.value })} />
              <input type="text" placeholder="Donor Name" className="form-control" required value={formData.donor} onChange={e => setFormData({ ...formData, donor: e.target.value })} />
              <input type="text" placeholder="Issue Time" className="form-control" required value={formData.issueTime} onChange={e => setFormData({ ...formData, issueTime: e.target.value })} />
              <input type="text" placeholder="Issue Date" className="form-control" required value={formData.issueDate} onChange={e => setFormData({ ...formData, issueDate: e.target.value })} />
              <input type="text" placeholder="Blood Group" className="form-control" required value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} />
              <input type="text" placeholder="Amount" className="form-control" required value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
              <button type="submit" className="btn btn-primary">{editingRow ? "Update" : "Add"}</button>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="card border-0 shadow-sm rounded">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>PATIENT</th>
                  <th>DOCTOR</th>
                  <th>DONOR</th>
                  <th>ISSUE DATE</th>
                  <th>BLOOD GROUP</th>
                  <th>AMOUNT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? currentRows.map(row => (
                  <tr key={row.id}>
                    <td>{row.patient.name}</td>
                    <td>{row.doctor.name}</td>
                    <td>{row.donor}</td>
                    <td>{row.issueTime} / {row.issueDate}</td>
                    <td><span className={`badge ${row.bloodGroup.includes('-ve') ? 'bg-danger' : 'bg-warning'}`} style={{ padding: '5px 10px' }}>{row.bloodGroup}</span></td>
                    <td>{row.amount}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-1" onClick={() => handleEdit(row)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="7" className="text-center text-muted py-3">No records found</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center p-3">
            <button className="btn btn-outline-primary" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</button>
            <div>{Array.from({ length: totalPages }, (_, i) => <button key={i} onClick={() => setCurrentPage(i + 1)} className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}>{i + 1}</button>)}</div>
            <button className="btn btn-outline-primary" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blood_banks;
