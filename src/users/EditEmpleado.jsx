import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    nombres: "",
    dni: "",
    celular:"",
    correo: "",
    foto:""
  });

  const { nombres: nomb, dni: dni, celular: celular,correo: correo,foto:foto} = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/ModConfig/empleado/${id}`, user);
    navigate("/verPersonal");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/ModConfig/verPersonal/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">REGISTRO DE EMPLEADOS</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                Nombres Completos:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingresar nombres completos"
                name="nombres"
                value={nomb}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dni" className="form-label">
                DNI:
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Ingrese su DNI"
                name="dni"
                value={dni}
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
            
              <label htmlFor="Email" className="form-label">
                Foto:
              </label>
              <input
                type={"file"}
                className="form-control"
                placeholder="Ingrese correo electrónico"
                accept=".jpg,.png,.jpeg"
                name="foto"
                value={foto}
                onChange={(e) => onInputChange(e)}
              />
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
