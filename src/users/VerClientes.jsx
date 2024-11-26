import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imagenExcel from '../imagenes/excel.png';
export default function VerPersonal() {
  
  const [users, setUsers] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/ModConfig/verClientes");
    setUsers(result.data);
  };

  const deleteUser = async (id,emp) => {
    const pregunta=window.confirm(`¿Está seguro que desea eliminar los datos del cliente ${emp} ?`);
    
    if (pregunta) {
      await axios.delete(`http://localhost:8080/ModConfig/cliente/${id}`);
    loadUsers();
    }else{
      
    }
  };

  const exportToExcel = () => {
    const csvData = [
      ["S.N", "Razon Social", "RUC", "Celular", "Correo", "Direccion"], // Nuevos encabezados
      ...users.map((user, index) => [
        index + 1,
        user.razonSocial,
        user.ruc,
        user.celular,
        user.correo,
        user.direccion,
      ]),
    ];

    const csvRows = csvData.map(row => row.join(";")); // Cambio del separador a punto y coma
    const csvContent = "\uFEFF" + csvRows.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-16le;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "proveedores.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Limpiar la URL creada
  };


  return (
    <div className="container">
      <Link className="btn btn-outline-primary mx-2" to={"/registroClientes"}>
      Agregar
      </Link>

      <Link className="btn btn-outline-danger mx-2" to={"/modConfig"}>
      Regresar
      </Link>

      <button className="btn btn-outline-success mx-2" onClick={exportToExcel}>
        <img src={imagenExcel} alt="Excel Icon" className="mr-2 img" />
        Exportar Excel
      </button>
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
                    to={`/edituser/${user.id}`}
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
