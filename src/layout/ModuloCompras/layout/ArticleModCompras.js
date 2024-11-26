import React from "react";
import '../estilos/imagen.css';
import '../estilos/contenedor.css';
import imagenProductos from '../imagenes/productos.png';
import imagenProveedores from '../../../imagenes/proveedores.png';
import imagenOC from '../imagenes/ordenescompra.png';

import { Link } from "react-router-dom";

export default function ArticleModCompras() {
    return (

        <article>
            <div className="card componente-container">

                <div className="container conten">

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/ProductosCompra"}>


                            <div className="image-container">
                                <img src={imagenProductos} className="img-modconfig"
                                    alt="Reg Empleados"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Productos</span>
                            </div>

                        </Link>
                    </div>
                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verProveedor"}>

                            <div className="image-container">
                                <img src={imagenProveedores} className="img-modconfig"
                                    alt="Proveedor"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Registrar Proveedores</span>
                            </div>

                        </Link>
                    </div>


                    <div className="card ">
                        <Link className="btn card-modConf" to={"/OCCompra"}>

                            <div className="image-container">
                                <img src={imagenOC} className="img-modconfig"
                                    alt="Proveedor"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Ordenes de Compra</span>
                            </div>

                        </Link>
                    </div>

                </div>
            </div>

        </article>

    );
}


