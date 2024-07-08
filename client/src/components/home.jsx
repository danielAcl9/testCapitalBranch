// src/components/Home.js
import React from 'react';
import { useFetch } from "../hooks/useFetch"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const { data: dataProd, isLoading, hasError } = useFetch("http://localhost:8080/api/productos");
    const { data: dataMov, isLoading: loadMov, hasError: movError} = useFetch("http://localhost:8080/api/movimientos");

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

    const NavNuevoProducto = () => {
        navigate('/nuevo-producto');
    };

    const NavIndicadores = () => {
        navigate('/indicadores');
    };
    
    return (
        <div>
            <h1>Gestión de Inventario</h1>

            <hr className="solid"></hr>

            <section>
                <h2>Funciones</h2>
                <button onClick={NavComprarProductos}>Comprar Productos</button>
                <button onClick={NavVenderProductos}>Vender productos</button>
                <br />

                <button onClick={NavModificarPrecio}>Modificar Precio</button>
                <button onClick={NavNuevoProducto}>Añadir nuevo producto</button>
                <br />
                
                <button onClick={NavIndicadores}>Panel de Indicadores</button>
            </section>

            <hr className="solid"></hr>

            <h3>Inventario Disponible</h3>
            <table className='tablas'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad Disponible</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {dataProd && dataProd.map(item => {
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
            </table>

            <hr className="solid"></hr>

            <h3>Historial de Movimientos</h3>
            <table className='tablas'>
                <thead>
                    <tr>
                        <th>ID Producto</th>
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
                            <tr key={item.id2}>
                                <td>{item.id_producto}</td>
                                <td>{item.nom_producto}</td>
                                <td>{item.tipo_movimiento}</td>
                                <td>{new Date(item.fecha).toLocaleDateString()}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.valor_movimiento}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
  );
};

export default Home;
