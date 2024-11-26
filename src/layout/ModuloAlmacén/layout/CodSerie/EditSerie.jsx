import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditModelo() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    nombre: "",
    marca:""
    
  });

  const [marcas, setMarcas] = useState([]); // Estado para almacenar las marcas

  useEffect(() => {
    loadUser();
    fetchMarcas();
  }, []);


  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/ModProductos/verModelo/${id}`);  
      setUser(result.data);
    } catch (error) {
      alert("Error al obtener los modelos",error);
    }  
  };

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModProductos/verMarca");
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    }
  };



  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const onSelectMarcaChange = (e) => {
    const selectedMarcaId = parseInt(e.target.value);
    const selectedMarca = marcas.find((marca) => marca.id === selectedMarcaId);
    setUser({ ...user, marca: selectedMarca });
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await axios.put(`http://localhost:8080/ModProductos/modelo/${id}`, user);
      navigate("/verModelo");
    } catch (error) {
      console.error("Error al editar el modelo:", error);
      alert("Error al editar el modelo. Verifica los datos e inténtalo nuevamente.");
    }
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
                value={user.marca.id}//value={marca ? marca.id : ""} o {user.marca}
                onChange={(e) => onSelectMarcaChange(e)}
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
            <Link className="btn btn-outline-danger mx-2" to="/verModelo">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
