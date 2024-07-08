import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import ComprarProducto from './components/comprar_producto'
import VenderProducto from './components/vender_producto'
import ModificarPrecio from './components/modificar_precio';
import NuevoProducto from './components/nuevo-producto';
import Indicadores from './components/indicadores';


const App = () => {
  return (
    <div>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/comprar-producto' element={<ComprarProducto />} />
            <Route path='/vender-producto' element={<VenderProducto />} />
            <Route path='/modificar-precio' element={<ModificarPrecio />} />
            <Route path='/nuevo-producto' element={<NuevoProducto />} />
            <Route path='/indicadores' element={<Indicadores />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App