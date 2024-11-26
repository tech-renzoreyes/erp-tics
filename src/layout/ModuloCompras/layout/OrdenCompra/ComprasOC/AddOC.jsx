import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddModelo() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    fecha:"",
    proveedor:"",
    total:"",
    tipoDocumento:""
    
  });

  const [proveedores, setProveedores] = useState([]); // Estado para almacenar los Proveedores

  useEffect(() => {
    async function fetchProveedores() {
      try {
        const response = await axios.get("http://localhost:8080/ModConfig/verProveedor");
        setProveedores(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    }

    fetchProveedores();
  }, []);



  //const { nombre: nombre,marca:marca} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {
      nombre: user.nombre,
      fecha:user.fecha,
      proveedor: {
        id: parseInt(user.proveedor)
      },
      total:user.total,
      tipoDocumento:user.tipoDocumento

    };

    try {
      await axios.post("http://localhost:8080/ModCompras/compra", dataToSend);  
    } catch (error) {
      
      alert(error);
      
    }
    
    navigate("/verCompra");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE COMPRAS OC</h2>

          <form onSubmit={(e) => onSubmit(e)}>


 
          

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingrese Nombre de OC
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Nombre de OC"
                name="nombre"
                value={user.nombre}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Ingrese fecha de compra
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="fecha de compra"
                name="fecha"
                value={user.fecha}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="provId" className="form-label">
                Seleccionar Proveedor
              </label>
              <select
                className="form-control"
                name="proveedor"
                value={user.razonSocial}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Seleccionar Proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.razonSocial}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="total" className="form-label">
                Ingrese total de compra
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="total de compra"
                name="total"
                value={user.total}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoDocumento" className="form-label">
                Ingrese Tipo de Documento
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="tipo de documento"
                name="tipoDocumento"
                value={user.tipoDocumento}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verCompra">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
