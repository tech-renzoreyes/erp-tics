import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddSerie() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    detalle: "",
    nombre:""
    
  });

  const [OCdetalle, setOCdetalle] = useState([]); // Estado para almacenar los Proveedores

  useEffect(() => {
    async function fetchSerie() {
      try {
        const response = await axios.get("http://localhost:8080/ModCompras/verDetalleCompra");
        setOCdetalle(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las series:", error);
      }
    }

    fetchSerie();
  }, []);



  //const { nombre: nombre,marca:marca} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {
      detalle: {
        id: parseInt(user.detalle)
      },
      nombre: user.nombre
    };

    try {
      await axios.post("http://localhost:8080/ModCompras/ComprasSeries", dataToSend);  
    } catch (error) {
      
      alert(error);
      
    }
    
    navigate("/verComprasSeries");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE SERIES SEGÚN OC</h2>

          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingrese Numero de Serie:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Numero de Serie"
                name="nombre"
                value={user.nombre}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="detalle" className="form-label">
                Seleccionar OC
              </label>
              <select
                className="form-control"
                name="detalle"
                value={user.detalle}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Seleccionar OC</option>
                {OCdetalle.map((detalle) => (
                  <option key={detalle.id} value={detalle.id}>
                    {detalle.compras.nombre}
                  </option> 
                ))}
              </select>
            </div>

           

            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verComprasSeries">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
