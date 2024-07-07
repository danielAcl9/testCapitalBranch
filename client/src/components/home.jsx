// src/components/Home.js
import React from 'react';
import { useFetch } from "../hooks/useFetch"
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { data, isLoading, hasError } = useFetch("http://localhost:8080/api/productos");
    const { data: dataMov } = useFetch("http://localhost:8080/api/movimientos");

    const navigate = useNavigate();

    const NavComprarProductos = () => {
        navigate('/comprar-producto');
    };

    const NavVenderProductos = () => {
        navigate('/vender-producto');
    };

    const NavModificarPrecio = () => {
        navigate('/modificar-precio');
    };
    
    return (
        <div>
            <h1>Gestión de Inventario</h1>
            <section>
                <button onClick={NavComprarProductos}>Comprar Productos</button>
                <button onClick={NavVenderProductos}>Vender productos</button>
                <button onClick={NavModificarPrecio}>Modificar Precio</button>
                {/* <button onClick={NavPrueba}>Prueba</button> */}
            </section>

            <hr class="solid"></hr>

            <section>
                <h3>Inventario Disponible</h3>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad Disponible</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nom_producto}</td>
                                <td>{item.cantidad_disp}</td>
                                <td>{item.precio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </section>

            <hr class="solid"></hr>

            <section>
                <h3>Historial de Movimientos</h3>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Tipo Movimiento</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Valor Movimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMov && dataMov.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id_producto}</td>
                                <td>{item.nom_producto}</td>
                                <td>{item.tipo_movimiento}</td>
                                <td>{item.fecha}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.valor_movimiento}</td>
                            </tr>
                        );
                    })}
                </tbody>

            </section>


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
