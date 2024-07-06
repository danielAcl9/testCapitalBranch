// src/components/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const NavComprarProductos = () => {
        navigate('/comprar-producto');
    };

    const NavPrueba = () => {
        navigate('/prueba');
    }
    
    return (
        <div>
            <h1>Gestión de Inventario HOME</h1>
            <section>
                <button onClick={NavComprarProductos}>Comprar Productos</button>
                <button onClick={NavPrueba}>Prueba</button>
                <button>Vender productos</button>
                <button>Modificar Precio</button>
            </section>

            <hr class="solid"></hr>

            {/* <section>
                <h2>Indicadores Clave</h2>
                <p>Fecha de Inicio</p>
                <input type="date"></input>
                <p>Fecha de Fin</p>
                <input type="date"></input>

                <p>Mercancía Vendida: 45</p>
                <p>Dinero Invertido: 500000</p>
            </section>

            <hr class="solid"></hr> */}
        </div>
  );
};

export default Home;
