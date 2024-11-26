import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    usuario: "",
    contraseña: "",
    CodPersona:"",
    
  });

  const { usuario: usuario, contraseña: contraseña, CodPersona: CodPersona} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 offset-md-2 border rounded p-4 mt shadow">
          <h2 className="text-center m-4">REGISTRO DE USUARIO</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Nombre de usuario:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese nombre de usuario"
                name="usuario"
                value={usuario}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Contraseña:
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Ingrese contraseña"
                name="contraseña"
                value={contraseña}
                onChange={(e) => onInputChange(e)}
              />  
            </div>
            
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Rol:
              </label>
              
              <select
                id="opciones"
                className="form-control"
                placeholder="Roles"
                name="usuario"
                value={usuario}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="opciones" className="form-label">
                Asociar a empleado:
              </label>
              <select
                
                className="form-control"
                
                id="opciones"
                name="CodPersona"
                value={CodPersona}
                onChange={(e) => onInputChange(e)}
              ></select>
            </div>
            

            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/modConfig">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
