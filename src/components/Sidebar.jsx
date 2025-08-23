import { NavLink } from "react-router-dom";
import SubHeader from "./SubHeader";
import { useState } from "react";



import {
    FaTachometerAlt,
    FaBox,
    FaShoppingCart,
    FaChartBar,
    FaComments,
    // FaCog,
    FaSignOutAlt,
    FaIdCard,
    FaUsers,
    FaTooth,
    FaPuzzlePiece,
    FaCalendarCheck,
    FaProcedures,
    FaUserCheck,
    FaFileInvoiceDollar,
    FaBed,
    FaTint,
    FaFileAlt,
    FaUserMd,
    FaPrescriptionBottleAlt,
    // FaMicroscope,
    FaQuestionCircle,
    // FaMoneyBillWave,
    FaBuilding,
    FaGlobe,
    FaMoneyBillWave,
    FaBoxes,
    FaVideo,
    FaPills,
    FaUserInjured,
    FaMicroscope,
    FaRegFileAlt,
    FaXRay,
    FaConciergeBell,
    FaEnvelopeOpenText,
    FaCog,
    FaSyringe
} from 'react-icons/fa';

const Sidebar = ({ collapsed, activeSection, setActiveSection }) => {




    return (
        <div
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            style={{
                position: 'fixed',
                top: '60px',
                left: 0,
                height: 'calc(100vh - 60px)',
                width: collapsed ? '70px' : '250px',
                backgroundColor: '#2c3e50',
                transition: 'all 0.3s ease-in-out',
                zIndex: 1030,
                overflowX: 'hidden',
                overflowY: 'auto'
            }}
        >
            <nav className="sidebar-nav pt-3">
                <ul className="nav flex-column">
                    {/* Dashboard */}
                    <li className="nav-item">
                        <NavLink
                            to="/dashboard"
                            onClick={() => setActiveSection("Dashboard")} // <-- yaha add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#fff',
                                // backgroundColor: '#34495e',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaTachometerAlt
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Dashboard
                                </span>
                            )}
                        </NavLink>
                    </li>





                    {/* Patient Smart Cards */}
                    <li className="nav-item">
                        <NavLink
                            to="/patient-smart-cards"
                            onClick={() => setActiveSection("Users")} // <-- yaha add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaIdCard
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Patient Smart Cards
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* users */}
                    <li className="nav-item">
                        <NavLink
                            to="/users"
                            onClick={() => setActiveSection("Users")} // <-- yaha add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaUsers
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Users
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Odontogram */}
                    <li className="nav-item">
                        <NavLink
                            to="/odontograms"
                            onClick={() => setActiveSection("Odontogram")} // <-- yaha add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaTooth
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Odontogram
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Addon */}
                    <li className="nav-item">
                        <NavLink
                            to="/addon"
                            onClick={() => setActiveSection("Addon")} // <-- yeh line add ki
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaPuzzlePiece
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Addon
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Appointments */}
                    <li className="nav-item">
                        <NavLink
                            to="/appointments"
                            onClick={() => setActiveSection("Appointments")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaCalendarCheck
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Appointments
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* IPD - Patient In */}
                    <li className="nav-item">
                        <NavLink
                            to="/ipd"
                            onClick={() => setActiveSection("IPD - Patient In")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaProcedures
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    IPD - Patient In
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* OPD - Patient Out */}
                    <li className="nav-item">
                        <NavLink
                            to="/opd-patient-out"
                            onClick={() => setActiveSection("OPD - Patient Out")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaUserCheck
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    OPD - Patient Out
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Billings */}
                    <li className="nav-item">
                        <NavLink
                            to="/billings"
                            onClick={() => setActiveSection("Billings")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaFileInvoiceDollar
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Billings
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Bed Management */}
                    <li className="nav-item">
                        <NavLink
                            to="/bed-management"
                            onClick={() => setActiveSection("Bed Management")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaBed
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Bed Management
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Blood Banks */}
                    <li className="nav-item">
                        <NavLink
                            to="/blood-banks"
                            onClick={() => setActiveSection("Blood Banks")} // <-- yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <FaTint
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px'
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Blood Banks
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Documents */}
                    <li className="nav-item">
                        <NavLink
                            to="/documents"
                            onClick={() => setActiveSection("Documents")} // 👈 yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaFileAlt
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Documents
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Doctors */}
                    <li className="nav-item">
                        <NavLink
                            to="/doctors"
                            onClick={() => setActiveSection("Doctors")} // 👈 yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaUserMd
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Doctors
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Prescriptions */}
                    <li className="nav-item">
                        <NavLink
                            to="/prescriptions"
                            onClick={() => setActiveSection("Prescriptions")} // 👈 yeh add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaPrescriptionBottleAlt
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Prescriptions
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Diagnosis */}
                    <li className="nav-item">
                        <NavLink
                            to="/diagnosis"
                            onClick={() => setActiveSection("Diagnosis")} // 👈 yeh line add ki
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaMicroscope
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Diagnosis
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Enquiries */}
                    <li className="nav-item">
                        <NavLink
                            to="/enquiries"
                            onClick={() => setActiveSection("Enquiries")} // ✅ Ye line add ki
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaQuestionCircle
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Enquiries
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Finances */}
                    <li className="nav-item">
                        <NavLink
                            to="/finances"
                            onClick={() => setActiveSection("Finances")} // ✅ Ye add kiya
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaMoneyBillWave
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Finances
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Front Office */}
                    <li className="nav-item">
                        <NavLink
                            to="/front-office"
                            onClick={() => setActiveSection("Front Office")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaBuilding
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Front Office
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Front CMS */}
                    <li className="nav-item">
                        <NavLink
                            to="/front-cms"
                            onClick={() => setActiveSection("Front CMS")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaGlobe
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Front CMS
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Hospital Charges */}
                    <li className="nav-item">
                        <NavLink
                            to="/hospital-charges"
                            onClick={() => setActiveSection("Hospital Charges")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaMoneyBillWave
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Hospital Charges
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Inventories */}
                    <li className="nav-item">
                        <NavLink
                            to="/inventories"
                            onClick={() => setActiveSection("Inventories")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaBoxes
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Inventories
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Live Consultations */}
                    <li className="nav-item">
                        <NavLink
                            to="/live-consultations"
                            onClick={() => setActiveSection("Live Consultations")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaVideo
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Live Consultations
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Medicines */}
                    <li className="nav-item">
                        <NavLink
                            to="/medicines"
                            onClick={() => setActiveSection("Medicines")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaPills
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Medicines
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Patients */}
                    <li className="nav-item">
                        <NavLink
                            to="/patients"
                            onClick={() => setActiveSection("Patients")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaUserInjured
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Patients
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Pathology */}
                    <li className="nav-item">
                        <NavLink
                            to="/pathology"
                            onClick={() => setActiveSection("Lab Technicians")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaMicroscope
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Pathology
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Reports */}
                    <li className="nav-item">
                        <NavLink
                            to="/reports"
                            onClick={() => setActiveSection("Users")} // ✅ Active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaRegFileAlt
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Reports
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Radiology */}
                    <li className="nav-item">
                        <NavLink
                            to="/radiology"
                            onClick={() => setActiveSection("Users")} // ✅ SubHeader ke liye active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaXRay
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Radiology
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* Services */}
                    <li className="nav-item">
                        <NavLink
                            to="/services"
                            onClick={() => setActiveSection("Users")} // SubHeader ke liye active section update
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaConciergeBell
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Services
                                </span>
                            )}
                        </NavLink>
                    </li>


                    {/* SMS / Mail */}
                    <li className="nav-item">
                        <NavLink
                            to="/sms-mail"
                            onClick={() => setActiveSection("Users")} // ya jo section ka SubHeader dikhana ho
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaEnvelopeOpenText
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    SMS / Mail
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Settings */}
                    <li className="nav-item">
                        <NavLink
                            to="/settings"
                            onClick={() => setActiveSection("Admin")} // yahan "Admin" ya jo section SubHeader dikhaye
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaCog
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Settings
                                </span>
                            )}
                        </NavLink>
                    </li>



                    {/* Vaccinations */}
                    <li className="nav-item">
                        <NavLink
                            to="/vaccinations"
                            onClick={() => setActiveSection("Vaccinations")} // yahan section name daalo
                            className="nav-link sidebar-item d-flex align-items-center px-3 py-3"
                            style={{
                                color: '#bdc3c7',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <FaSyringe
                                style={{
                                    fontSize: '1.1rem',
                                    minWidth: '20px',
                                    marginRight: collapsed ? '0' : '12px',
                                }}
                            />
                            {!collapsed && (
                                <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                                    Vaccinations
                                </span>
                            )}
                        </NavLink>
                    </li>




                </ul>
            </nav>


            {/* SubHeader Section */}
            <div style={{ marginLeft: collapsed ? '70px' : '250px', transition: 'margin-left 0.3s ease' }}>
                        <SubHeader activeSection={activeSection} />
                    </div>

            {/* Bottom section */}
            {/* <div className="sidebar-bottom position-absolute bottom-0 w-100 p-3">
                <a
                    href="#"
                    className="nav-link sidebar-item d-flex align-items-center logout-btn"
                    style={{
                        color: '#bdc3c7',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.2s ease'
                    }}
                >
                    <FaSignOutAlt
                        style={{
                            fontSize: '1.1rem',
                            minWidth: '20px',
                            marginRight: collapsed ? '0' : '12px'
                        }}
                    />
                    {!collapsed && (
                        <span className="sidebar-text" style={{ fontSize: '0.95rem' }}>
                            Logout
                        </span>
                    )}
                </a>
            </div> */}
        </div>
    );
};

export default Sidebar;