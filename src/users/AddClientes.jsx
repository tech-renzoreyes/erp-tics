import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddClientes() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    razonSocial: "",  
    ruc: "",
    celular:"",
    correo: "",
    direccion:""
  });

  const { razonSocial: razonSocial, ruc: ruc, celular: celular,correo: correo,direccion:direccion} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/ModConfig/cliente", user);
    navigate("/verClientes");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">REGISTRO DE CLIENTES</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="razonSocial" className="form-label">
                Razón Social:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresar Razón Social"
                name="razonSocial"
                value={razonSocial}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ruc" className="form-label">
                RUC:
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Ingrese su RUC"
                name="ruc"
                value={ruc}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Celular" className="form-label">
                Celular:
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Ingrese celular"
                name="celular"
                value={celular}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Correo:
              </label>
              <input
                type={"email"}
                className="form-control"
                placeholder="Ingrese correo electrónico"
                name="correo"
                value={correo}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <div className="mb-3">
            
              <label htmlFor="direccion" className="form-label">
                Dirección:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresar dirección"
                name="direccion"
                value={direccion}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/verClientes">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
