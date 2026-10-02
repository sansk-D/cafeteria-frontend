import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    estudiante_id: venta.estudiante_id || '',
    producto_id: venta.producto_id || '',
    cantidad: venta.cantidad,
    fecha: venta.fecha
  });
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error(err));
      
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   api.post('/ventas', formData)
      .then(res => {
        alert(res.data.message);
        onUpdate(); // refresca la lista de ventas
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  const inputStyle = {
    background: 'rgba(0,0,0,0.5)', 
    border: '1px solid rgba(59, 130, 246, 0.5)', 
    color: '#e0e0e0', 
    padding: '10px', 
    borderRadius: '8px', 
    outline: 'none',
    minWidth: '150px'
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed #e23636', borderRadius: '10px', background: 'rgba(226, 54, 54, 0.05)' }}>
      <h3 style={{ color: '#e23636', textAlign: 'center', marginTop: 0 }}>Editando Venta #{venta.id}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione estudiante</option>
          {estudiantes.map(e => (
            <option key={e.id} value={e.id} style={{color: 'black'}}>{e.nombre} - {e.grupo}</option>
          ))}
        </select>
        
        <select name="producto_id" value={formData.producto_id} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id} style={{color: 'black'}}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>
        
        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={{...inputStyle, color: '#3b82f6'}} />
        
        <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarVenta;