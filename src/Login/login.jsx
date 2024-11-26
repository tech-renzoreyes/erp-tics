import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    let navigate=useNavigate();

    const[user,setUser]=useState({
        nombre:"",
        contraseña:""

    });


    const{nombre:usuario,contraseña:contraseña}=user;

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

/*
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/ModConfig/empleado", user);
        navigate("/verPersonal");
      };
*/

    return(
        <div className="container">

            <form className="card" >

                <div>
                    <label htmlFor="usuario">Usuario:</label>
                    <input 
                    type="text" 
                    id="usuario"
                    placeholder="ingrese usuario"
                    name="usuario"
                    value={usuario}
                    />
                </div>
                
                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input 
                    type="password" 
                    id="contraseña"
                    placeholder="ingrese contraseña"
                    name="contraseña"
                    value={contraseña}
                     />
                </div>
                

                
                <button className="btn btnwarning" type="submit">Iniciar Sesion</button>
                <button></button>
            </form>

        </div>
        

    );

}
