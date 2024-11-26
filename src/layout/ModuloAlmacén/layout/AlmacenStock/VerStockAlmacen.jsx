import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imagenExcel from '../../imagenes/excel.png';


export default function VerCompra() {
  
  const [users, setUsers] = useState([]);

  //const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/ModCompras/verDetalleCompra");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/ModCompras/detalle/${id}`);
    loadUsers();
  };

  const exportToExcel = () => {
    const csvData = [
      ["S.N", "Fecha", "N° OC", "Detalle de Productos", "Stock"], // Encabezados
      ...users.map((user, index) => [
        index + 1,
        user.fecha,
        user.nombre,
        user.productos.categoria.nombre + " " + user.productos.marca.nombre + " " + user.productos.modelo.nombre,
        user.cantidad,
      ]),
    ];

    const csvRows = csvData.map(row => row.join(";")); // Cambio del separador a una pestaña
    const csvContent = "\uFEFF" + csvRows.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-16le;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "compras.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Limpiar la URL creada
  };


  return (
    <div className="container">

      <Link className="btn btn-outline-primary mx-2" to={"/RegistrarCompra"}>
      Agregar
      </Link>

      <Link className="btn btn-outline-danger mx-2" to={"/modAlmacen"}>
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
              <th scope="col">fecha</th>
              <th scope="col">N° OC</th>
              <th scope="col">Detalle de Productos</th>
              <th scope="col">Stock</th>
              <th scope="col">OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.fecha}</td>
                <td>{user.nombre}</td>
                <td>{user.productos.categoria.nombre+" "+user.productos.marca.nombre
                    +" "+user.productos.modelo.nombre}</td>
                <td>{user.cantidad}</td>
              
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewcompra/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcompra/${user.id}`}
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
      
      
    </div>
  );
}
