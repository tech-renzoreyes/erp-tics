import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function VerModelo() {
  
  const [users, setUsers] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/ModProductos/verModelo");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/ModProductos/modelo/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Nombre Marca</th>
              <th scope="col">Nombre Modelo</th>
              <th scope="col">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.marca.nombre}</td>
                <td>{user.nombre}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewmodelo/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmodelo/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      <Link className="btn btn-outline-primary mx-2" to={"/RegistrarModelo"}>
      Agregar
      </Link>

      <Link className="btn btn-outline-danger mx-2" to={"/ProductosCompra"}>
      Regresar
      </Link>
      
    </div>
  );
}
