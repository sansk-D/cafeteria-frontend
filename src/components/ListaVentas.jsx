import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = () => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const handleUpdate = () => {
    cargarVentas();
    setVentaSeleccionada(null); 
  };

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete(`/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas(); 
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div className="table-container">
      <h2>Historial de Ventas</h2>
      
      {ventaSeleccionada && (
        <EditarVenta venta={ventaSeleccionada} onUpdate={handleUpdate} />
      )}

      <table>
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.estudiante}</td>
              <td>{v.producto}</td>
              <td>{v.cantidad}</td>
              <td>${v.precio}</td>
              <td>${v.total}</td>
              <td>{v.fecha}</td>
              <td style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setVentaSeleccionada(v)}
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarVenta(v.id)}
                  style={{ background: '#e23636', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaVentas;