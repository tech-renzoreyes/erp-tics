import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProducto() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    categoria: "",
    marca:"",
    modelo:"",
    precio:"",
    
  });


  const [categorias, setCategoria] = useState([]); // Estado para almacenar los categorias
  const [marcas, setMarcas] = useState([]); // Estado para almacenar los marcas
  const [modelos, setModelo] = useState([]); // Estado para almacenar los modelos

  useEffect(() => {
    loadUser();
    fetchCategorias();
    fetchMarcas();
    fetchModelos();
    
  }, []);


  
  
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/ModCompras/verComprasProductos/${id}`);  
      setUser(result.data);
    } catch (error) {
      alert("Error al obtener los productos PRUEBA",error);
    }  
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/ModProductos/verCategoria`);
      setCategoria(response.data);
    } catch (error) {
      alert("Error al obtener las marcas:", error);
    }
  };
  

  const fetchMarcas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModProductos/verMarca");
      setMarcas(response.data);
    } catch (error) {
      alert("Error al obtener las marcas:", error);
    }
  };

  const fetchModelos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ModProductos/verModelo");
      setModelo(response.data);
    } catch (error) {
      alert("Error al obtener los MODELOS XD PRUEBA:", error);
    }
  };


  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const onSelectCategoriaChange = (e) => {
    const selectedCategoriaId = parseInt(e.target.value);
    const selectedCategoria = categorias.find((categoria) => categoria.id === selectedCategoriaId);
    setUser({ ...user, categoria: selectedCategoria });
  };

  const onSelectMarcaChange = (e) => {
    const selectedMarcaId = parseInt(e.target.value);
    const selectedMarca = marcas.find((marca) => marca.id === selectedMarcaId);
    setUser({ ...user, marca: selectedMarca });
  };

  const onSelectModeloChange = (e) => {
    const selectedModeloId = parseInt(e.target.value);
    const selectedModelo = modelos.find((modelo) => modelo.id === selectedModeloId);
    setUser({ ...user, modelo: selectedModelo });
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/ModCompras/compraProducto/${id}`, user);
      navigate("/verComprasProductos");
    } catch (error) {
      console.error("Error al editar el modelo:", error);
      alert("Error al editar el modelo. Verifica los datos e inténtalo nuevamente.");
    }
  };



  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE DETALLE PRODUCTOS ADQUIRIDOS</h2>

          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                Ingrese Categoria
              </label>
              <select
                className="form-control"
                name="categoria"
                value={user.categoria.id}
                onChange={(e) => onSelectCategoriaChange(e)}
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
              <label htmlFor="marca" className="form-label">
                Ingrese Marca
              </label>
              <select
                className="form-control"
                name="marca"
                value={user.marca.id}
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
              <label htmlFor="modelo" className="form-label">
              Ingrese Modelo
              </label>
              <select
                className="form-control"
                name="modelo"
                value={user.modelo.id}
                onChange={(e) => onSelectModeloChange(e)}
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
