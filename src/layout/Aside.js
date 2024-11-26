import React from "react";
import { Link } from "react-router-dom";
import '../estilos/imagenAside.css';
import imagenAdministrador from '../imagenes/usuario.png';
import imagenAlmacen from '../imagenes/almacen.png';
import imagenVentas from '../imagenes/carrito-de-compras.png';
import imagenClientes from '../imagenes/cliente.png';
import imagenProveedores from '../imagenes/proveedores.png';
import imagenConfiguracion from '../imagenes/configuracion.png';
//Esto es de prueba
export default function Aside() {
  return (
   

<aside>

    <div className="seccion"> 


    <div className="perfil-contenedor">
        <div className="perfil">

        
        <img className="img-perfil" src={imagenAdministrador}></img>
        <span className="text-perfil">Administrador</span>
        </div>
    </div>
               
           
        <ul className="listas-items">


            <li className="panel">
                <Link className="btn custom-outline-primary mx-2" to={`/modCompras`}>
                <img className="img" src={imagenProveedores}></img>
                <span className="text">Compras</span>
                </Link>
            </li>
            
            <li className="panel">
                <Link className="btn custom-outline-primary mx-2" to={`/modAlmacen`}>
                <img className="img" src={imagenAlmacen}></img>
                <span className="text">Almacén</span>
                </Link>
            </li>

            <li className="panel">
                <Link className="btn custom-outline-primary mx-2" to={`/modConfig`}>
                <img className="img" src={imagenVentas}></img>
                <span className="text">Ventas</span>
                </Link>
            </li>

            <li className="panel">
                <Link className="btn custom-outline-primary mx-2" to={`/verClientes`}>
                <img className="img" src={imagenClientes}></img>
                <span className="text">Clientes</span>
                </Link>
            </li>

            


            <li className="panel">
                <Link className="btn custom-outline-primary mx-2" to={`/modConfig`}>
                <img className="img" src={imagenConfiguracion}></img>
                <span className="text">Configuración</span>
                </Link>
            </li>



        </ul>
        
       
    </div>

    
</aside>

  );
}
