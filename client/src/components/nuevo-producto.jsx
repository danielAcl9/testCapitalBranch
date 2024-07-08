import React from "react"
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

const nuevo_producto= (producto) => {
    fetch("http://localhost:8080/api/productos/nuevo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        producto: producto
      })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }

function NuevoProducto() {
    const {producto, onInputChange, onResetForm} = useForm({
        producto: ""
    });

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (!producto) {
            alert("Se necesita el nombre");
            return;
        }
        nuevo_producto(producto);
        alert("Producto creado con éxito");
        onResetForm();
    }

    return (
      <div>
            <h1>Añadir Nuevo Producto</h1>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="producto">Nombre Producto</label><br />
                <input name="producto" type="text" value={producto} onChange={onInputChange}/>
                <br />
                <button type="submit">Crear Producto</button>
            </form>

      </div>
    );
  }
  
  export default NuevoProducto;