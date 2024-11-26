import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function VerPersonal() {
  
  const [users, setUsers] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/ModConfig/verProveedor");
    setUsers(result.data);
  };

  const deleteUser = async (id,emp) => {

    const pregunta=window.confirm(`¿Está seguro que desea eliminar los datos de la empresa ${emp} ?`);
    
    if (pregunta) {
      await axios.delete(`http://localhost:8080/ModConfig/proveedor/${id}`);
    loadUsers();
    }else{
      
    }
    
  };





  return (
    <div className="container">
      <Link className="btn btn-outline-primary mx-2" to={"/registroProveedor"}>
      Agregar
      </Link>

      <Link className="btn btn-outline-danger mx-2" to={"/ModCompras"}>
      Regresar
      </Link>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Razon Social</th>
              <th scope="col">RUC</th>
              <th scope="col">Celular</th>
              <th scope="col">Correo</th>
              <th scope="col">Direccion</th>
              <th scope="col">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.razonSocial}</td>
                <td>{user.ruc}</td>
                <td>{user.celular}</td>
                <td>{user.correo}</td>
                <td>{user.direccion}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editProveedor/${user.id}`}
                  >
                    Edit
                  </Link>

                  
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id,user.razonSocial)}
                  >
                    Delete
                  </button>



                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
