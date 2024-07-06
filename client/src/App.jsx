import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import ComprarProducto from './components/comprar_producto'
import Prueba from './components/prueba'


const App = () => {
  return (
    <div>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/comprar-producto' element={<ComprarProducto />} />
            <Route path='/prueba' element={<Prueba />} />
          </Routes>
        </div>

      </Router>

      {/* 

      <hr class="solid"></hr>

      <section>
        <h2>Indicadores Clave</h2>
        <p>Fecha de Inicio</p>
        <input type="date"></input>
        <p>Fecha de Fin</p>
        <input type="date"></input>

        <p>Mercancía Vendida: 45</p>
        <p>Dinero Invertido: 500000</p>
      </section>

      <hr class="solid"></hr>

      <section>
        <h3>Inventario Disponible</h3>
        <table>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad Disponible</th>
            <th>Precio</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Pantallas</td>
            <td>10</td>
            <td>15000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sillas</td>
            <td>35</td>
            <td>5000</td>
          </tr>
        </table>

        <hr class="solid"></hr>

        <h3>Movimientos realizados</h3>
        <table>
          <tr>
            <th>ID Producto</th>
            <th>Producto</th>
            <th>Tipo Movimiento</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Valor Movimiento</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Teclado</td>
            <td>Venta</td>
            <td>2024-01-10</td>
            <td>2</td>
            <td>15000</td>
          </tr>
        </table>
      </section> */}
    </div>
  )
}

export default App