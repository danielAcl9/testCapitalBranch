import React from 'react';
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

function setFechas(fecha_inicio, fecha_fin) {
    return `http://localhost:8080/api/indicadores/mercancia?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`;
}


function Indicadores() {

    const { data: dataMercancia, isLoading, hasError } = useFetch("http://localhost:8080/api/indicadores/mercancia?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}");
    
    const {fecha_inicio, fecha_fin, onInputChange, onResetForm} = useForm({
        
        fecha_inicio: "",
        fecha_fin: ""
    });
    
    const onFormSubmit = (event) => {
        event.preventDefault();
        setFechas(fecha_inicio, fecha_fin);
        onResetForm();
        
        return dataMercancia;
    }
    
    // const { data: dataInversion, isLoading: loadVentas, hasError: ventasError} = useFetch("http://localhost:8080/api/indicadores/inversion");
    
    return (
        console.log(dataMercancia),
        <div>
        <h1>Indicadores</h1>
        <form onSubmit={onFormSubmit}>
            <label htmlFor="">Fecha de Inicio</label> <br />
            <input name = "fecha_inicio" type="date" value={fecha_inicio} onChange={onInputChange}/>
            <br />

            <label htmlFor="">Fecha de Fin</label> <br />
            <input name = "fecha_fin" type="date" value={fecha_fin} onChange={onInputChange}/>
            <br />
            <br />
            <button onClick={setFechas}>Calcular</button>

            <hr class="solid"></hr>

            <h3>Mercancia vendida</h3>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Total Vendido</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMercancia && dataMercancia.map(item => {
                        return (
                            <tr>
                                <td>{item.nom_producto}</td>
                                <td>{item.total_vendido}</td>
                            </tr>
                        );
                    })}
                </tbody>
        </form>
      </div>
    );
}

export default Indicadores;