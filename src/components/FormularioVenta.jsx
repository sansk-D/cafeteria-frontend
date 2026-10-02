import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar listas de estudiantes y productos al iniciar
  useEffect(() => {
    api.get('http://localhost:3000/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error(err));

    api.get('http://localhost:3000/productos')
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
        setFormData({ estudiante_id: '', producto_id: '', cantidad: '', fecha: '' });
        // Recargar la página para que la tabla de abajo se actualice
        window.location.reload(); 
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  // Estilos Spider-Man para los inputs
  const inputStyle = {
    background: 'rgba(0,0,0,0.5)', 
    border: '1px solid rgba(59, 130, 246, 0.5)', 
    color: '#e0e0e0', 
    padding: '10px', 
    borderRadius: '8px', 
    outline: 'none',
    minWidth: '200px'
  };

  return (
    <div className="table-container" style={{ marginBottom: '20px' }}>
      <h2>Registrar Nueva Venta</h2>
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

        <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required style={inputStyle} />
        
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={{...inputStyle, color: '#3b82f6'}} />
        
        <button type="submit" style={{ background: '#e23636', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 15px rgba(226, 54, 54, 0.4)' }}>
          Registrar Venta
        </button>
      </form>
    </div>
  );
}

export default FormularioVenta;