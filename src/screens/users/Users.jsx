import React, { useState, useEffect } from "react";
import { FaFilter, FaUserPlus, FaTrashAlt, FaEdit } from "react-icons/fa";

const initialUsers = [
  {
    name: "Infy HMS",
    email: "admin@hms.com",
    role: "Administrators",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    name: "Ekta Malviya",
    email: "1ekta@gmail.com",
    role: "Accountant",
    initials: "EM",
    color: "#f4a261",
  },
  {
    name: "Harish Mohan",
    email: "vatsal@gmail.com",
    role: "Doctors",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Pravina Makvana",
    email: "pravina@gmail.com",
    role: "Nurses",
    initials: "PM",
    color: "#9d4edd",
  },
  {
    name: "اديب الصلوي",
    email: "salah@gmail.com",
    role: "Patients",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
  },
  {
    name: "Shakeel Ak",
    email: "shakeel@gmail.com",
    role: "Receptionists",
    initials: "SA",
    color: "#f28482",
  },
  {
    name: "Shailesh Ladhumar",
    email: "shailesh@gmail.com",
    role: "Pharmacists",
    initials: "SL",
    color: "#f9c74f",
  },
  {
    name: "Anjali Kumari",
    email: "anjali@gmail.com",
    role: "Patients",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Sharma",
    email: "rohit@gmail.com",
    role: "Doctors",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    name: "Kavita Joshi",
    email: "kavita@gmail.com",
    role: "Nurses",
    initials: "KJ",
    color: "#90be6d",
  },
];

const Users = ({ sidebarCollapsed }) => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100); // page fade-in
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleAdd = () => {
    const name = prompt("Enter user name:");
    const email = prompt("Enter user email:");
    const role = prompt("Enter user role:");
    if (name && email && role) {
      setUsers([{ name, email, role }, ...users]);
      setCurrentPage(1);
    }
  };

  const handleEdit = (index) => {
    const user = currentUsers[index];
    const name = prompt("Edit name:", user.name);
    const email = prompt("Edit email:", user.email);
    const role = prompt("Edit role:", user.role);
    if (name && email && role) {
      const updatedUsers = [...users];
      const globalIndex = users.indexOf(user);
      updatedUsers[globalIndex] = {
        ...updatedUsers[globalIndex],
        name,
        email,
        role,
      };
      setUsers(updatedUsers);
    }
  };

  const handleDelete = (index) => {
    const user = currentUsers[index];
    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers(users.filter((u) => u !== user));
    }
  };

  const handlePrev = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const handleNext = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages));

  return (
    <div
      className="main-content"
      style={{
        marginLeft: sidebarCollapsed ? "70px" : "250px",
        paddingTop: "80px",
        marginTop: "60px",
        transition: "margin-left 0.3s ease-in-out",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#f1f5f9",
        padding: "20px",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0px)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      {/* Header */}
      <div
        className="users-header d-flex justify-content-between mb-3"
        style={{
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            width: "250px",
            border: "1px solid #ccc",
            flex: "1 1 auto",
          }}
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            className="btn btn-light"
            style={{
              transition: "all 0.3s",
            }}
          >
            <FaFilter />
          </button>
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "all 0.3s",
            }}
          >
            <FaUserPlus /> New User
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="users-table bg-white shadow-sm"
        style={{
          borderRadius: "8px",
          overflowX: "auto",
          transition: "transform 0.3s",
        }}
      >
        <div className="table-header d-flex p-2 bg-light">
          <span className="flex-2 fw-bold">USER</span>
          <span className="flex-1 fw-bold">ROLE</span>
          <span className="flex-1 fw-bold">EMAIL</span>
          <span className="flex-1 fw-bold">EMAIL ACTIVE</span>
          <span className="flex-1 fw-bold">STATE</span>
          <span className="flex-1 fw-bold">ACTION</span>
        </div>

        {currentUsers.map((user, index) => (
          <div
            key={index}
            className="table-row d-flex align-items-center p-2 border-bottom"
            style={{
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div className="flex-2 d-flex align-items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="me-2 rounded-circle"
                  style={{ width: "36px", height: "36px" }}
                />
              ) : (
                <div
                  className="me-2 rounded-circle text-center"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: user.color || "#ccc",
                    lineHeight: "36px",
                    color: "#fff",
                  }}
                >
                  {user.initials}
                </div>
              )}
              <div>
                <div>{user.name}</div>
                <small className="text-muted">{user.email}</small>
              </div>
            </div>

            <span className="flex-1">{user.role}</span>

            <span className="flex-1">
              <input type="checkbox" defaultChecked />
            </span>

            <span className="flex-1">
              <input type="checkbox" defaultChecked />
            </span>

            <span className="flex-1 d-flex">
              <FaEdit
                className="me-2 text-primary"
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => handleEdit(index)}
              />
              <FaTrashAlt
                className="text-danger"
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => handleDelete(index)}
              />
            </span>
          </div>
        ))}

        {currentUsers.length === 0 && (
          <div className="text-center p-3 text-muted">
            No matching users found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div
        className="pagination d-flex justify-content-center mt-3"
        style={{ flexWrap: "wrap", gap: "6px" }}
      >
        <button
          className="btn btn-light"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-light ${currentPage === i + 1 ? "active btn-primary text-white" : ""
              }`}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              transition: "all 0.3s",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-light"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
