import React from "react"
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

const modificar_precio = (producto, precio) => {
    fetch("http://localhost:8080/api/productos/modificar_precio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            producto: producto, 
            precio: precio
          })
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
      }

function ModificarPrecio() {
    const { data, isLoading, hasError } = useFetch("http://localhost:8080/api/productos/nombres");
    
    const {producto, precio, onInputChange, onResetForm} = useForm({
        producto: "",
        precio: ""
    });
    
    const onFormSubmit = (event) => {
        event.preventDefault();
    
        if (!producto || !precio) {
            alert("Todos los campos son requeridos");
            return;
        }
        modificar_precio(producto, precio);
        alert("Producto modificado con éxito");
    
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
                    </select><br />

                    <label htmlFor="">Nuevo Precio</label><br />
                    <input name = "precio" type="text" value={precio} onChange={onInputChange}/><br />
                    <button type="submit">Enviar</button>
                    <br />
                </form>
            </div>
        );
}
  
  export default ModificarPrecio;