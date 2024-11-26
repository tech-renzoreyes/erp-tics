import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddModelo() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: "",
    marca:""
    
  });

  const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas

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



  //const { nombre: nombre,marca:marca} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {
      nombre: user.nombre,
      marca: {
        id: parseInt(user.marca)
      }
    };

    try {
      await axios.post("http://localhost:8080/ModProductos/modelo", dataToSend);  
    } catch (error) {
      
      alert(error);
      
    }
    
    navigate("/verModelo");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE MODELO</h2>

          <form onSubmit={(e) => onSubmit(e)}>


 
          <div className="mb-3">
              <label htmlFor="marcaId" className="form-label">
                Seleccionar Marca
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
              <label htmlFor="nombre" className="form-label">
                Ingresar Modelo
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresar Modelo"
                name="nombre"
                value={user.nombre}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          
            
            

            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verMarca">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
