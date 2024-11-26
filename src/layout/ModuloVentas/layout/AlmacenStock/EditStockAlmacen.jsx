import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditModelo() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    nombre: "",
    fecha:"",
    proveedor:"",
    total:"",
    tipoDocumento:""
    
  });
 
  const [proveedores, setProveedores] = useState([]); // Estado para almacenar los Proveedores

  useEffect(() => {
    loadUser();
    fetchProveedor();
  }, []);


  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/ModCompras/verCompra/${id}`);  
      setUser(result.data);
    } catch (error) {
      alert("Error al obtener los modelos",error);
    }  
  };

  const fetchProveedor = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModConfig/verProveedor");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    }
  };



  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const onSelectProveedorChange = (e) => {
    const selectedProveedorid = parseInt(e.target.value);
    const selectedProveedor = proveedores.find((proveedor) => proveedor.id === selectedProveedorid);
    setUser({ ...user, proveedor: selectedProveedor });
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await axios.put(`http://localhost:8080/ModCompras/compra/${id}`, user);
      navigate("/verCompra");
    } catch (error) {
      console.error("Error al editar el modelo:", error);
      alert("Error al editar el modelo. Verifica los datos e inténtalo nuevamente.");
    }
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
                value={user.proveedor.id}
                onChange={(e) => onSelectProveedorChange(e)}
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
