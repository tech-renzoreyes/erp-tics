import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddDetalle() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    compras: "",
    productos:"",
    cantidad:""
  });

  const [compras, setCompras] = useState([]); // Estado para almacenar los Proveedores
  const [productos, setProductos] = useState([]); // Estado para almacenar los Proveedores  


  useEffect(() => {
    async function fetchCompras() {
      try {
        const response = await axios.get("http://localhost:8080/ModCompras/verCompra");
        setCompras(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las ordendes de compras id:", error);
      }
    }

    fetchCompras();
  }, []);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await axios.get("http://localhost:8080/ModCompras/verComprasProductos");
        setProductos(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    fetchProductos();
  }, []);



  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {
      compras:{
        id: parseInt(user.compras)
      },
      productos:{
        id: parseInt(user.productos)
      },
      cantidad:user.cantidad,

    };

    try {
      await axios.post("http://localhost:8080/ModCompras/DetalleCompras", dataToSend);  
    } catch (error) {
      
      alert(error);
      
    }
    
    navigate("/verDetalleCompra");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE DETALLES DE OC</h2>

          <form onSubmit={(e) => onSubmit(e)}>


            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingrese Nombre de OC
              </label>
              <select
                className="form-control"
                name="compras"
                value={user.compras}
                onChange={(e) => onInputChange(e)}
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
                value={user.productos}
                onChange={(e) => onInputChange(e)}
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
            <Link className="btn btn-outline-danger mx-2" to="/verDetalleCompra">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
