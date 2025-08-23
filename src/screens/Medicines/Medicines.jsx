import React, { useState } from 'react';
import { FaPills, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Medicines = ({ sidebarCollapsed }) => {
  const [data, setData] = useState([
    { id:1, brand: 'TEST B', email: 'nothing', phone: 'nothing', job: 'nothing' },
    { id:2, brand: 'paracetamol', email: 'harry14911@gmail.com', phone: '6288338336+', job: 'nothing' },
    { id:3, brand: 'Clarke Cole', email: 'rojasy@mailinator.com', phone: '91827105763+', job: 'nothing' },
    { id:4, brand: 'xxxxxx', email: 'ravikant892123@gmail.com', phone: '6208789891918+', job: 'nothing' },
    { id:5, brand: 'Java', email: 'nothing', phone: 'nothing', job: 'nothing' },
    { id:6, brand: 'Med Brand', email: 'nothing', phone: 'nothing', job: 'nothing' },
    { id:7, brand: 'ITC', email: 'yrdmin@gmail.com', phone: '622345636536+', job: 'nothing' },
    { id:8, brand: 'fire', email: 'nothing', phone: '622154535321+', job: 'nothing' },
    { id:9, brand: 'Krisha Thulasi', email: 'admin@gmail.com', phone: 'nothing', job: 'nothing' },
  ]);

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [adding, setAdding] = useState(false);
  const [newMed, setNewMed] = useState({ brand: '', email: '', phone: '', job: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter data
  const filteredData = data.filter(item =>
    item.brand.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.phone.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentData = filteredData.slice((currentPage-1)*pageSize, currentPage*pageSize);

  const handleSave = id => {
    setData(data.map(d => d.id === id ? editValues : d));
    setEditingId(null);
  };

  const handleAdd = () => {
    const nextId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { ...newMed, id: nextId }]);
    setNewMed({ brand: '', email: '', phone: '', job: '' });
    setAdding(false);
  };

  return (
    <div style={{ marginLeft: sidebarCollapsed ? '70px' : '250px', paddingTop: '80px', minHeight:'100vh', backgroundColor:'#f4f6f9', padding:'20px' }}>
      
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px', marginBottom:'20px' }}>
        <input type="text" placeholder="Search" value={search} onChange={e=>{setSearch(e.target.value); setCurrentPage(1)}} style={{ maxWidth:'300px', borderRadius:'8px', padding:'8px' }} />
        <button onClick={()=>setAdding(true)} style={{ display:'flex', alignItems:'center', padding:'10px 20px', borderRadius:'8px', backgroundColor:'#4e73df', color:'#fff', border:'none', cursor:'pointer' }}>
          <FaPills style={{ marginRight:'8px' }} /> New drug label
        </button>
      </div>

      {/* Table */}
      <div style={{ background:'#fff', borderRadius:'12px', padding:'20px', overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ background:'#f1f5f9' }}>
            <tr>
              <th style={{ padding:'12px', textAlign:'left' }}>BRAND</th>
              <th style={{ padding:'12px', textAlign:'left' }}>E-MAIL</th>
              <th style={{ padding:'12px', textAlign:'left' }}>PHONE</th>
              <th style={{ padding:'12px', textAlign:'left' }}>A JOB</th>
              <th style={{ padding:'12px', textAlign:'left' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} style={{ borderBottom:'1px solid #eee' }}>
                <td style={{ padding:'12px' }}>{editingId===item.id ? <input value={editValues.brand} onChange={e=>setEditValues({...editValues, brand:e.target.value})} /> : <span style={{color:'#0d6efd'}}>{item.brand}</span>}</td>
                <td style={{ padding:'12px' }}>{editingId===item.id ? <input value={editValues.email} onChange={e=>setEditValues({...editValues, email:e.target.value})} /> : item.email}</td>
                <td style={{ padding:'12px' }}>{editingId===item.id ? <input value={editValues.phone} onChange={e=>setEditValues({...editValues, phone:e.target.value})} /> : item.phone}</td>
                <td style={{ padding:'12px' }}>{editingId===item.id ? <input value={editValues.job} onChange={e=>setEditValues({...editValues, job:e.target.value})} /> : item.job}</td>
                <td style={{ padding:'12px', display:'flex', gap:'10px' }}>
                  {editingId===item.id ? (
                    <>
                      <FaSave style={{cursor:'pointer', color:'#22c55e'}} onClick={()=>handleSave(item.id)} />
                      <FaTimes style={{cursor:'pointer', color:'#ef4444'}} onClick={()=>setEditingId(null)} />
                    </>
                  ) : (
                    <>
                      <FaEdit style={{cursor:'pointer', color:'#0d6efd'}} onClick={()=>{setEditingId(item.id); setEditValues(item);}} />
                      <FaTrashAlt style={{cursor:'pointer', color:'#dc3545'}} onClick={()=>setData(data.filter(d=>d.id!==item.id))} />
                    </>
                  )}
                </td>
              </tr>
            ))}
            {currentData.length===0 && <tr><td colSpan="5" style={{textAlign:'center', color:'#6b7280'}}>No records found</td></tr>}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages>1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginTop:'20px' }}>
            <button onClick={()=>setCurrentPage(prev=>Math.max(prev-1,1))} disabled={currentPage===1} style={{ padding:'6px 12px', borderRadius:'6px', cursor:'pointer' }}>Prev</button>
            {[...Array(totalPages)].map((_,i)=>(
              <button key={i} onClick={()=>setCurrentPage(i+1)} style={{ padding:'6px 12px', borderRadius:'6px', cursor:'pointer', backgroundColor: currentPage===i+1 ? '#4e73df' : '#fff', color: currentPage===i+1 ? '#fff' : '#000' }}>{i+1}</button>
            ))}
            <button onClick={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))} disabled={currentPage===totalPages} style={{ padding:'6px 12px', borderRadius:'6px', cursor:'pointer' }}>Next</button>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {adding && (
        <div style={{position:'fixed', top:0,left:0,width:'100vw',height:'100vh', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div style={{background:'#fff', padding:'30px', borderRadius:'12px', minWidth:'300px'}}>
            <h3 style={{marginBottom:'20px'}}>Add New Medicine</h3>
            <input type="text" placeholder="Brand" value={newMed.brand} onChange={e=>setNewMed({...newMed, brand:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc'}} />
            <input type="text" placeholder="Email" value={newMed.email} onChange={e=>setNewMed({...newMed, email:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc'}} />
            <input type="text" placeholder="Phone" value={newMed.phone} onChange={e=>setNewMed({...newMed, phone:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'8px', border:'1px solid #ccc'}} />
            <input type="text" placeholder="Job" value={newMed.job} onChange={e=>setNewMed({...newMed, job:e.target.value})} style={{width:'100%', padding:'10px', marginBottom:'20px', borderRadius:'8px', border:'1px solid #ccc'}} />
            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
              <button onClick={()=>setAdding(false)} style={{padding:'10px 20px', borderRadius:'8px', border:'1px solid #ccc', cursor:'pointer'}}>Cancel</button>
              <button onClick={handleAdd} style={{padding:'10px 20px', borderRadius:'8px', border:'none', backgroundColor:'#4e73df', color:'#fff', cursor:'pointer'}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicines;
