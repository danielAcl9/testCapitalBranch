import React from "react"
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

const comprar_producto = (producto, cantidad, precio) => {
    fetch("http://localhost:8080/api/productos/compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        producto: producto, 
        cantidad: cantidad,
        precio: precio
      })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }

function ComprarProducto() {
    const { data, isLoading, hasError } = useFetch("http://localhost:8080/api/productos/nombres");

    const {producto, cantidad, precio, onInputChange, onResetForm} = useForm({
        producto: "",
        cantidad: "",
        precio: ""
    });

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (!producto || !cantidad || !precio) {
            alert("Todos los campos son requeridos");
            return;
        }
        comprar_producto(producto, cantidad, precio);
        alert("Producto comprado con éxito");
        onResetForm();
    }

    return (
        <div>
            <h1>Formulario Comprar Productos</h1>
            <form onSubmit={onFormSubmit}>
                <label forhtml = "producto">Nombre Producto</label>
                <br />

                <select name = "producto" id="producto" value={producto} onChange={onInputChange}   >
                    <option value="">Seleccione un producto</option>
                    {data && data.map((producto) => (
                        <option value={producto} key = {producto}>{producto}</option>
                    ))}
                </select>

                <br />

                <label htmlFor="">Cantidad</label> 
                <br />

                <input name = "cantidad" type="text" value={cantidad} onChange={onInputChange}/>
                <br />

                <label htmlFor="">Precio</label> <br />
                <input name = "precio" type="text" value={precio} onChange={onInputChange}/> 
                <br />
                <br />
                
                <button type="submit">Guardar compra</button>
            </form>
        </div>
    );
}

export default ComprarProducto;