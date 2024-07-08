import React from "react"
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

const vender_producto = (producto, cantidad, precio) => {
    fetch("http://localhost:8080/api/productos/vender", {
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

function VenderProducto() {
    
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
        vender_producto(producto, cantidad, precio);
        console.log(hasError);
        if (hasError === null) {
            alert("Error al vender el producto, no hay suficientes unidades");
            return;
        }
        alert("Producto vendido con éxito");

        onResetForm();
    }

    return (
        <div>
            <h1>Formulario Vender Productos</h1>
            <form onSubmit={onFormSubmit}>
                <label forhtml = "producto">Nombre Producto</label><br />
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

                <label htmlFor="">Precio</label>
                <br />
                <input name = "precio" type="text" value={precio} onChange={onInputChange}/>
                <br />
                <br />
                <button type="submit">Vender</button>
            </form>
        </div>
    );
  }
  
  export default VenderProducto;