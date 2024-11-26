import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    nombre: ""
    
  });

  const { nombre: nombre} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/ModProductos/categoria", user);
    navigate("/verCategoria");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE CATEGORIA</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Ingresar Categoria
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresar Categoria"
                name="nombre"
                value={nombre}
                onChange={(e) => onInputChange(e)}
              />
            </div>
           

            
            

            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verCategoria">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
