import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// import Home from "./screens/home/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SubHeader from "./components/SubHeader"; // ✅ New Import

import Dashboard from "./screens/dashboard/Dashboard";
import Patient_smart_cards from "./screens/patient_smart_cards/Patient_smart_cards";
import Users from "./screens/users/Users";
import Odontograms from "./screens/odontograms/Odontograms";
import Addon from "./screens/addon/Addon";
import Appointments from "./screens/appointments/Appointments";
import Ipd from "./screens/ipd/Ipd";
import Opd from "./screens/opd/Opd";
import Billings from "./screens/billings/Billings";
import Bed_managements from "./screens/bed_management/Bed_managements";
import Blood_banks from "./screens/blood_banks/Blood_banks";
import Documents from "./screens/document/Documents";
import Doctors from "./screens/doctors/Doctors";
import Prescriptions from "./screens/prescriptions/Prescriptions";
import Diagnosis from "./screens/diagnosis/Diagnosis";
import Enquiries from "./screens/enquiries/Enquiries";
import Finances from "./screens/finances/Finances";
import Front_Office from "./screens/front Office/Front_Office";
import Front_CMF from "./screens/Front CMS/Front_cms";
import Hospital_Charges from "./screens/Hospital Charges/Hospital_Charges";
import Inventories from "./screens/Inventories/Inventories";
import Live_Consultations from "./screens/Live Consultations/Live_Consultations";
import Medicines from "./screens/Medicines/Medicines";
import Patients from "./screens/Patients/Patients";
import Pathology from "./screens/Pathology/Pathology";
import Reports from "./screens/Reports/Reports";
import Radiology from "./screens/Radiology/Radiology";
import Services from "./screens/Services/Services";
import SMS_Mail from "./screens/SMS_Mail/SMS_Mail";
import Settings from "./screens/Settings/Settings";
import Vaccinations from "./screens/Vaccinations/Vaccinations";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard"); // ✅ New state

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar
  collapsed={sidebarCollapsed}
  activeSection={activeSection}
  setActiveSection={setActiveSection}
/>

      <SubHeader activeSection={activeSection} /> {/* ✅ Show below sidebar/header */}

      <Routes>
        {/* <Route path="/" element={<Home sidebarCollapsed={sidebarCollapsed} />} /> */}
        <Route path="/dashboard" element={<Dashboard sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/patient-smart-cards" element={<Patient_smart_cards sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/users" element={<Users sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/odontograms" element={<Odontograms sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/addon" element={<Addon sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/appointments" element={<Appointments sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/Ipd" element={<Ipd sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/opd-patient-out" element={<Opd sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/billings" element={<Billings sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/bed-management" element={<Bed_managements sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/blood-banks" element={<Blood_banks sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/documents" element={<Documents sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/doctors" element={<Doctors sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/prescriptions" element={<Prescriptions sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/diagnosis" element={<Diagnosis sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/enquiries" element={<Enquiries sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/finances" element={<Finances sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/front-office" element={<Front_Office sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/front-cms" element={<Front_CMF sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/hospital-charges" element={<Hospital_Charges sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/inventories" element={<Inventories sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/live-consultations" element={<Live_Consultations sidebarCollapsed={sidebarCollapsed} />}/>
        <Route path="/medicines" element={<Medicines sidebarCollapsed={sidebarCollapsed} />}/>
        <Route path="/patients" element={<Patients sidebarCollapsed={sidebarCollapsed} />}/>
        <Route path="/pathology" element={<Pathology sidebarCollapsed={sidebarCollapsed} />}/>
        <Route path="/reports" element={<Reports sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/radiology" element={<Radiology sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/services" element={<Services sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/sms-mail" element={<SMS_Mail sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/settings" element={<Settings sidebarCollapsed={sidebarCollapsed} />} />
        <Route path="/vaccinations" element={<Vaccinations sidebarCollapsed={sidebarCollapsed} />} />
      </Routes>
    </>
  );
}

export default App;






// import React, { useState } from "react"
// import { Routes, Route } from "react-router-dom";



// import Home from "./screens/home/Home";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./screens/dashboard/Dashboard";
// import Patient_smart_cards from "./screens/patient_smart_cards/Patient_smart_cards";
// import Users from "./screens/users/Users";
// import Odontograms from "./screens/odontograms/Odontograms";
// import Addon from "./screens/addon/Addon";
// import Appointments from "./screens/appointments/Appointments";
// import Ipd from "./screens/ipd/Ipd";
// import Opd from "./screens/opd/Opd";
// import Billings from "./screens/billings/Billings";
// import Bed_managements from "./screens/bed_management/Bed_managements";
// import Blood_banks from "./screens/blood_banks/Blood_banks";
// import Documents from "./screens/document/Documents";
// import Doctors from "./screens/doctors/Doctors";
// import Prescriptions from "./screens/prescriptions/Prescriptions";
// import Diagnosis from "./screens/diagnosis/Diagnosis";
// import Enquiries from "./screens/enquiries/Enquiries";
// import Finances from "./screens/finances/Finances";
// import Front_Office from "./screens/front Office/Front_Office";
// import Front_CMF from "./screens/Front CMS/Front_cms";
// import Hospital_Charges from "./screens/Hospital Charges/Hospital_Charges";
// import Inventories from "./screens/Inventories/Inventories";
// import Live_Consultations from "./screens/Live Consultations/Live_Consultations";
// import Medicines from "./screens/Medicines/Medicines";
// import Patients from "./screens/Patients/Patients";
// import Pathology from "./screens/Pathology/Pathology";
// import Reports from "./screens/Reports/Reports";
// import Radiology from "./screens/Radiology/Radiology";
// import Services from "./screens/Services/Services";
// import SMS_Mail from "./screens/SMS_Mail/SMS_Mail";
// import Settings from "./screens/Settings/Settings";
// import Vaccinations from "./screens/Vaccinations/Vaccinations";



// // import About from "./screens/about/About";

// function App() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <>
//       <Header
//         onToggleSidebar={toggleSidebar}
//         sidebarCollapsed={sidebarCollapsed}
//       />
//       <Sidebar collapsed={sidebarCollapsed} />





//       <Routes>
//         <Route path="/" element={<Home sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/dashboard" element={<Dashboard sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/patient-smart-cards" element={<Patient_smart_cards sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/users" element={<Users sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/odontograms" element={<Odontograms sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/addon" element={<Addon sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/appointments" element={<Appointments sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/Ipd" element={<Ipd sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/opd-patient-out" element={<Opd sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/billings" element={<Billings sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/bed-management" element={<Bed_managements sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/blood-banks" element={<Blood_banks sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/documents" element={<Documents sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/doctors" element={<Doctors sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/prescriptions" element={<Prescriptions sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/diagnosis" element={<Diagnosis sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/enquiries" element={<Enquiries sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/finances" element={<Finances sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/front-office" element={<Front_Office sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/front-cms" element={<Front_CMF sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/hospital-charges" element={<Hospital_Charges sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/inventories" element={<Inventories sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/live-consultations" element={<Live_Consultations sidebarCollapsed={sidebarCollapsed} />}/>
//         <Route path="/medicines" element={<Medicines sidebarCollapsed={sidebarCollapsed} />}/>
//         <Route path="/patients" element={<Patients sidebarCollapsed={sidebarCollapsed} />}/>
//         <Route path="/pathology" element={<Pathology sidebarCollapsed={sidebarCollapsed} />}/>
//         <Route path="/reports" element={<Reports sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/radiology" element={<Radiology sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/services" element={<Services sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/sms-mail" element={<SMS_Mail sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/settings" element={<Settings sidebarCollapsed={sidebarCollapsed} />} />
//         <Route path="/vaccinations" element={<Vaccinations sidebarCollapsed={sidebarCollapsed} />} />

        


//         {/* <Route path="/about" element={<About sidebarCollapsed={sidebarCollapsed}/>} /> */}
//         {/* Add more routes as needed */}
//       </Routes>
//     </>
//   )
// }

// export default App
