
import React from "react";


const SubHeader = ({ activeSection }) => {
  // Har section ke subheader content define karo
  const subHeaderData = {
    Dashboard: ["Dashboard"],
    PatientSmartCards: ["Smart Patient Card Templates", "Generate Patient Smart Cards"],
    Users: ["Users", "Admins", "Accountants", "Nurses", "Receptionists", "Lab Technicians", "Pharmacists"],
    Odontograms: ["Odontograms"],
    Addon: ["Addon"],
    Appointments: ["Appointments", "Appointment Transactions"],
    Ipd: ["IPD Patients"],
    opd: ["OPD Patients"],
    Billings: ["The Account", "Employee Payroll", "Bills", "Payments", "payment Reports", "Advance Payments", "Pay bills manually"],
    Bed_management: ["bed condition", "Bed assignments", "Bed", "Types of beds"],
    Blood_banks: ["blood banks", "blood donors", "Donate blood", "blood problems"],
    Documents: ["Documents", "Types of documents"],
    Doctors: ["doctors","Departments of the doctor", "Tables", "Doctors' holidays", "breaks"],
    Prescriptions: ["prescriptions"],
    Diagnosis: ["Diagnostic category", "Diagnostic tests"],
    Enquiries: ["inquiries"],
    Finances: ["expenses", "Revenues"],
    Front_Office: ["call logs", "Visitors", "Receive mail", "Postal mailing"],
    Front_CMF: ["CMS", "Front-end CMS services", "Warning signs", "Certificates - Recommendations"],
    Hospital_Charges: ["Hospital_Charges", "Charge Categories", "Charges", "Doctor OPD Charges"],
    Inventories: ["Items Categories", "Items", "Item Stocks", "Issued Items"],
    Live_Consultations: ["Live Consultations", "Live Meetings"],
    Medicines: ["Medicine Categories", "Medicine Brands", "Medicines", "Purchase Medicine", "Used Medicine", "Medicine Bill"],
    Patients: ["Patients", "Cases", "Case Handlers", "Patient Admissions"],
    Pathology: ["Pathology", "Pathology Units", "Pathology Parameters", "Pathology Tests"],
    Reports: ["Birth Reports", "Death Reports", "Investigation Reports", "Operation Reports"],
    Radiology: ["Radiology", "Radiology Units", "Radiology Parameters", "Radiology Tests"],
    Services: ["Services", "Service Categories", "Service Charges"],
    SMS_Mail: ["SMS / Mail", "Send SMS", "Send Email"],
    Settings: ["Settings", "Hospital Settings", "User Settings", "Backup & Restore", "System Logs"],
    
}

// Active section ke liye content lo
const items = subHeaderData[activeSection] || [];

return (
  <div className="sub-header">
    {items.map((item, index) => (
      <button key={index} className="sub-header-btn">
        {item}
      </button>
    ))}
  </div>
);
};

export default SubHeader;
