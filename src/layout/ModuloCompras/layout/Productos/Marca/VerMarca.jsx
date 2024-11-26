import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert } from "bootstrap";

export default function VerMarca() {
  
  const [users, setUsers] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/ModProductos/verMarca");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    
      await axios.delete(`http://localhost:8080/ModProductos/marca/${id}`);
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
              <th scope="col">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.nombre}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewmarca/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editmarca/${user.id}`}
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
      <Link className="btn btn-outline-primary mx-2" to={"/RegistrarMarca"}>
      Agregar
      </Link>

      <Link className="btn btn-outline-danger mx-2" to={"/ProductosCompra"}>
      Regresar
      </Link>
      
    </div>
  );
}
