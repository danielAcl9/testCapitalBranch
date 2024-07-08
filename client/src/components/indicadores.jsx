import React from 'react';
import { useFetch } from "../hooks/useFetch"
import { useForm } from "../hooks/useForm"

async function getDataMercancia(fechaini,fechafin){
    let dataMercancia;

    try {
        const resp = await fetch(`http://localhost:8080/api/indicadores/mercancia?fecha_inicio=${fechaini}&fecha_fin=${fechafin}`);
        dataMercancia = await resp.json();
        
        return {dataMercancia};
    } catch (error) {
        console.log(error);
    }
    
}

async function getDataInversion(fechaini,fechafin){
    let dataInversion;
    
    try {
        const resp2 = await fetch(`http://localhost:8080/api/indicadores/inversion?fecha_inicio=${fechaini}&fecha_fin=${fechafin}`);
        dataInversion = await resp2.json();

        return {dataInversion};
    } catch (error) {
        console.log(error);
    }
}

function Indicadores() {
    
    const {fecha_inicio, fecha_fin, onInputChange, onResetForm} = useForm({
        
        fecha_inicio: "",
        fecha_fin: ""
    });

    const [dataMercancia, setDataMercancia] = React.useState([]);
    const [dataInversion, setDataInversion] = React.useState([]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        getDataMercancia(fecha_inicio, fecha_fin).then((data) => {
            setDataMercancia(data.dataMercancia);
        });
        getDataInversion(fecha_inicio, fecha_fin).then((data) => {
            setDataInversion(data.dataInversion);
        });
        onResetForm();
    }
    
    return (
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
            <button type='submit'>Enviar</button>
        </form>

            <hr className="solid"></hr>

            <h3>Mercancia vendida</h3>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad Vendida</th>
                    </tr>
                </thead>
                <tbody>
                    {dataMercancia && dataMercancia.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.nom_producto}</td>
                                <td>{item.total_vendido}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <hr className="solid"></hr>

            <h3>Dinero Invertido</h3>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Total Invertido</th>
                    </tr>
                </thead>
                <tbody>
                    {dataInversion && dataInversion.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.nom_producto}</td>
                                <td>{item.total_invertido}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
      </div>
    );
}

export default Indicadores;