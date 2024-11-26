import React from "react";
import '../../estilos/imagen.css';
import '../../estilos/contenedor.css';


import { Link } from "react-router-dom";

export default function ArticleProductos() {
    return (

        <article>
            <div className="card componente-container">

                <div className="container conten">

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verCategoria"}>

                            <div class="card-body">
                                <span className="texto">Registrar Categoria</span>
                            </div>

                        </Link>
                    </div>
                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verMarca"}>
                            <div class="card-body">
                                <span className="texto">Registrar Marca</span>
                            </div>

                        </Link>
                    </div>

                    <div className="card ">
                        <Link className="btn card-modConf" to={"/verModelo"}>
                            <div class="card-body">
                                <span className="texto">Registrar Modelo</span>
                            </div>

                        </Link>
                    </div>

                    <div className="d-grid gap-2">
                        <Link className=" card-modConf " to={"/modCompras"}>
                            <button className="btn btn-danger btn-lg">
                                regresar
                            </button>

                        </Link>
                    </div>

                </div>
            </div>

        </article>

    );
}


