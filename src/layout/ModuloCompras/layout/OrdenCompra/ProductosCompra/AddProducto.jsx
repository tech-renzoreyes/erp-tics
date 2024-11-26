import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProducto() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    categoria: "",
    marca:"",
    modelo:"",
    precio:"",
    
  });

  const [categorias, setCategoria] = useState([]); // Estado para almacenar los Proveedores
  const [marcas, setMarcas] = useState([]); // Estado para almacenar los Proveedores
  const [modelos, setModelo] = useState([]); // Estado para almacenar los Proveedores

  useEffect(() => {
    async function fetchCategoria() {
      try {
        const response = await axios.get("http://localhost:8080/ModProductos/verCategoria");
        setCategoria(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    }

    fetchCategoria();
  }, []);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await axios.get("http://localhost:8080/ModProductos/verMarca");
        setMarcas(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    }

    fetchMarcas();
  }, []);

  useEffect(() => {
    async function fetchModelo() {
      try {
        const response = await axios.get("http://localhost:8080/ModProductos/verModelo");
        setModelo(response.data); // Actualizar el estado con las marcas obtenidas
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    }

    fetchModelo();
  }, []);





  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {


      categoria: {
        id: parseInt(user.categoria)
      },
      marca:{
        id: parseInt(user.marca)
      },
      modelo:{
        id: parseInt(user.modelo)
      },
      precio:user.precio,
    };


    try {
      await axios.post("http://localhost:8080/ModCompras/ComprasProductos", dataToSend);  
    } catch (error) {
      
      alert(error);
      
    }
    
    navigate("/verComprasProductos");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE DETALLE PRODUCTOS ADQUIRIDOS</h2>

          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingrese Categoria
              </label>
              <select
                className="form-control"
                name="categoria"
                value={user.categoria}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Seleccionar Categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Ingrese Marca
              </label>
              <select
                className="form-control"
                name="marca"
                value={user.marca}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Seleccionar Marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="provId" className="form-label">
              Ingrese Modelo
              </label>
              <select
                className="form-control"
                name="modelo"
                value={user.modelo}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Seleccionar Modelo</option>
                {modelos.map((modelo) => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Ingrese precio unitario
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Ingrese precio unitario"
                name="precio"
                value={user.precio}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verComprasProductos">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
