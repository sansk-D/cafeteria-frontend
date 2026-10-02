import React from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './index.css';

function App() {
  return (
    <div>
      <h1>Cafetería Escolar INFRAMEN</h1>
      <FormularioVenta />
      <ListaVentas />
    </div>
  );
}

export default App;