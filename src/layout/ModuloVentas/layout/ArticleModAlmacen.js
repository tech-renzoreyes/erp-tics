import React from "react";
import '../estilos/imagen.css';
import '../estilos/contenedor.css';
import imagenStock from '../imagenes/stock.png';
import imagenCodSerie from '../imagenes/codigo-de-barras.png';

import { Link } from "react-router-dom";

export default function ArticleModCompras() {
    return (

        <article>
            <div className="card componente-container">

                <div className="container conten">

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verAlmacenStock"}>


                            <div className="image-container">
                                <img src={imagenStock} className="img-modconfig"
                                    alt="Reg Empleados"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">Registrar Ventas</span>
                            </div>

                        </Link>
                    </div>
                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verAlmacenStock"}>

                            <div className="image-container">
                                <img src={imagenCodSerie} className="img-modconfig"
                                    alt="Proveedor"></img>
                            </div>

                            <div class="card-body">
                                <span className="texto">REGISTRAR NUMERO DE SERIE</span>
                            </div>

                        </Link>
                    </div>


                

                </div>
            </div>

        </article>

    );
}


