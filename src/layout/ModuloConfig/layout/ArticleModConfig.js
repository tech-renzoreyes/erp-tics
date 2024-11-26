import React from "react";
import '../estilos/imagen.css';
import '../estilos/contenedor.css';
import imagenEmpleados from '../imagenes/empleados.png';
import imagenUser from '../imagenes/user.png';
import imagenPersonal from '../imagenes/personal.png';
import imagenRoles from '../imagenes/roles.png';

import imagenClientes from '../../../imagenes/cliente.png';
import imagenProductos from '../../../imagenes/almacen.png';
import { Link } from "react-router-dom";

export default function ArticleModConfig() {
    return (

        <article>
            <div className="card componente-container">

                <div className="container conten">

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/registroEmpleado"}>


                            <div className="image-container">
                                <img src={imagenEmpleados} className="img-modconfig"
                                    alt="Reg Empleados"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Registrar Empleados</span>
                            </div>

                        </Link>
                    </div>


                   

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/registroClientes"}>

                            <div className="image-container">
                                <img src={imagenClientes} className="img-modconfig"
                                    alt="Personal"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Registrar Clientes</span>
                            </div>

                        </Link>
                    </div>

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verPersonal"}>

                            <div className="image-container">
                                <img src={imagenProductos} className="img-modconfig"
                                    alt="Personal"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Registrar Productos</span>
                            </div>

                        </Link>
                    </div>

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/registroUsuario"}>


                            <div className="image-container">
                                <img src={imagenUser} className="img-modconfig"
                                    alt="Usuario"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Asignar Usuario</span>
                            </div>

                        </Link>
                    </div>
                    <div className="card ">
                        <Link className="btn card-modConf" to={"/registroRoles"}>


                            <div className="image-container">
                                <img src={imagenRoles} className="img-modconfig"
                                    alt="Usuario"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Configurar Roles</span>
                            </div>

                        </Link>
                    </div>


                  



                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verPersonal"}>

                            <div className="image-container">
                                <img src={imagenPersonal} className="img-modconfig"
                                    alt="Personal"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Personal</span>
                            </div>

                        </Link>
                    </div>


                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verProveedor"}>

                            <div className="image-container">
                                <img src={imagenPersonal} className="img-modconfig"
                                    alt="Personal"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Proveedor</span>
                            </div>

                        </Link>
                    </div>



                </div>
            </div>

        </article>

    );
}


