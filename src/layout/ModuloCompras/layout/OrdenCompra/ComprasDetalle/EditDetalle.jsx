import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditModelo() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    compras: "",
    productos:"",
    cantidad:""
  });

  const [compras, setCompras] = useState([]); // Estado para almacenar los Proveedores
  const [productos, setProductos] = useState([]); // Estado para almacenar los Proveedores  

  useEffect(() => {
    loadUser();
    fetchCompras();
    fetchProductos();
  }, []);


  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/ModCompras/verDetalleCompra/${id}`);  
      setUser(result.data);
    } catch (error) {
      alert("Error al obtener los detalles",error);
    }  
  };

  const fetchCompras = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModCompras/verCompra");
      setCompras(response.data);
    } catch (error) {
      alert("Error al obtener los compras XD PRUEBA:", error);
    }
  };
 
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModCompras/verComprasProductos");
      setProductos(response.data);
    } catch (error) {
      alert("Error al obtener los productos:", error);
    }
  };
 




  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const onSelectComprasChange = (e) => {
    const selectedComprasId = parseInt(e.target.value);
    const selectedCompras = compras.find((compras) => compras.id === selectedComprasId);
    setUser({ ...user, compras: selectedCompras });
  };

  const onSelectProductosChange = (e) => {
    const selectedProductosId = parseInt(e.target.value);
    const selectedProductos = productos.find((productos) => productos.id === selectedProductosId);
    setUser({ ...user, productos: selectedProductos });
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await axios.put(`http://localhost:8080/ModCompras/detalle/${id}`, user);
      navigate("/verDetalleCompra");
    } catch (error) {
      console.error("Error al editar el modelo:", error);
      alert("Error al editar el modelo. Verifica los datos e inténtalo nuevamente.");
    }
  };



  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE DETALLES DE OC</h2>

          <form onSubmit={(e) => onSubmit(e)}>


            <div className="mb-3">
              <label htmlFor="compras" className="form-label">
                Ingrese Nombre de OC
              </label>
              <select
                className="form-control"
                name="compras"
                value={user.compras.id}
                onChange={(e) => onSelectComprasChange(e)}
              >
                <option value="">Seleccionar OC</option>
                {compras.map((compras) => (
                  <option key={compras.id} value={compras.id}>
                    {compras.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="productos" className="form-label">
                Ingrese Detalle de producto
              </label>
              <select
                className="form-control"
                name="productos"
                value={user.productos.id}
                onChange={(e) => onSelectProductosChange(e)}
              >
                <option value="">Seleccionar Detalle Producto</option>
                {productos.map((productos) => (
                  <option key={productos.id} value={productos.id}>
                    {productos.categoria.nombre+" "+productos.marca.nombre
                    +" "+productos.modelo.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Ingrese Cantidad de Producto
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="cantidad"
                name="cantidad"
                value={user.cantidad}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/VerDetalleCompra">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
