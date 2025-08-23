import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBell,
  FaUser,
  FaChevronDown,
  FaLock,
  FaGlobe,
  FaSignOutAlt,
  FaEdit,
  FaSearch
} from 'react-icons/fa';

const Header = ({ onToggleSidebar, sidebarCollapsed }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="header fixed-top shadow-sm"
      style={{
        backgroundColor: '#ffffff',
        color: '#495057',
        height: '60px',
        zIndex: 1040,
        borderBottom: '1px solid #e9ecef',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div className="container-fluid px-3 h-100">
        <div className="row align-items-center h-100">

          {/* Left - Hamburger + Logo */}
          <div className="col-auto d-flex align-items-center">
            <button
              className="btn btn-link p-0 me-3 hamburger-btn"
              onClick={onToggleSidebar}
              style={{
                border: 'none',
                fontSize: '1.4rem',
                color: '#495057',
                background: 'transparent',
                transition: 'transform 0.3s'
              }}
            >
              {sidebarCollapsed ? <FaBars /> : <FaTimes />}
            </button>

            <div className="logo d-flex align-items-center">
              <FaTachometerAlt style={{ fontSize: '1.5rem', marginRight: '8px', color: '#3498db' }} />
              <span className="fw-bold" style={{ fontSize: '1.4rem' }}>CareConsole</span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="col d-none d-md-flex justify-content-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
              <FaSearch style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
              <input
                type="text"
                placeholder="Search patients, doctors..."
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  padding: '5px 15px 5px 35px',
                  border: '1px solid #ced4da',
                  outline: 'none',
                  transition: '0.3s all',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ced4da'}
              />
            </div>
          </div>

          {/* Right - Notifications + Profile */}
          <div className="col-auto ms-auto d-flex align-items-center">

            {/* Notifications */}
            <div className="position-relative me-3">
              <button
                className="btn btn-link p-0 position-relative notification-btn"
                style={{
                  border: 'none',
                  fontSize: '1.2rem',
                  color: '#495057',
                  background: 'transparent'
                }}
              >
                <FaBell />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem', animation: 'pulse 1.5s infinite' }}
                >
                  3
                </span>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="profile-section position-relative" ref={dropdownRef}>
              <button
                className={`btn btn-link p-0 d-flex align-items-center profile-btn ${open ? 'open' : ''}`}
                style={{ border: 'none', textDecoration: 'none', color: '#495057', background: 'transparent' }}
                onClick={() => setOpen(!open)}
              >
                <div style={{ position: 'relative', width: '35px', height: '35px' }} className="rounded-circle me-2">
                  <FaUser style={{ width: '100%', height: '100%' }} />
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'limegreen',
                    borderRadius: '50%',
                    border: '2px solid #fff'
                  }}></span>
                </div>
                <span className="d-none d-md-inline fw-medium me-1">CC Admin</span>
                <FaChevronDown className="d-none d-md-inline" style={{ fontSize: '0.8rem', transition: 'transform 0.3s' }} />
              </button>

              {open && (
                <div
                  className="dropdown-menu show mt-2 shadow"
                  style={{
                    position: "absolute",
                    right: 0,
                    minWidth: "220px",
                    borderRadius: "8px",
                    padding: "0.5rem 0",
                    opacity: 0,
                    transform: 'translateY(-10px)',
                    animation: 'fadeInDrop 0.3s forwards'
                  }}
                >
                  <div className="px-3 py-2 border-bottom text-center">
                    <div style={{ fontWeight: "600" }}>CC Admin</div>
                    <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>ccadmin@gmail.com</div>
                  </div>
                  <button className="dropdown-item d-flex align-items-center">
                    <FaEdit className="me-2" /> Edit Profile
                  </button>
                  <button className="dropdown-item d-flex align-items-center">
                    <FaLock className="me-2" /> Change Password
                  </button>
                  <button className="dropdown-item d-flex align-items-center">
                    <FaGlobe className="me-2" /> Change Language
                  </button>
                  <button className="dropdown-item d-flex align-items-center text-danger">
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInDrop {
          to { opacity: 1; transform: translateY(0); }
        }
        .profile-btn.open .fa-chevron-down {
          transform: rotate(180deg);
        }
        .dropdown-item:hover {
          background-color: #f1f3f5;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
