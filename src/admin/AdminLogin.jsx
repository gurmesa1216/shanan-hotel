import React,{useState} from "react"
import {api} from "../api/client.js"
import "./AdminLogin.css"


export default function AdminLogin({onLogin}){


const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")


async function login(e){

    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");


    try{

        const result = await api.adminLogin({
            username,
            password
        });


        console.log("LOGIN RESULT:", result);



        if(result?.success){

            console.log("LOGIN SUCCESS");


            localStorage.setItem(
                "admin",
                JSON.stringify(result.admin)
            );


            onLogin();


        }
        else{

            console.log("LOGIN FAILED");

            setError(
                "Wrong username or password"
            );

        }


    }catch(error){

        console.error(
            "LOGIN ERROR:",
            error
        );

        setError(
            "Server error"
        );

    }

}



return (

<div className="admin-login-page">
<div className="admin-login">

<h1>
🔐 Admin Login
</h1>


<form onSubmit={login}>


<input
placeholder="Username"
value={username}
onChange={e=>setUsername(e.target.value)}
/>


<input
placeholder="Password"
type="password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>


<button type="submit">
Login
</button>


</form>


<p>{error}</p>

</div>
</div>

)

}