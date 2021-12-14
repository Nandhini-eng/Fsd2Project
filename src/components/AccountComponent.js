import React from 'react';
import {useHistory} from "react-router-dom";
import { user } from './Login';


function Account() {
    const history=useHistory();
    console.log(user)
    /*const Logout=()=>{
        history.push("/login");
    }*/
    return(
        <div className="container">
            <div className="row">
                <h1> hi {user}</h1>
                <br/>
                
            </div>    
        </div>
    );
}

export default Account;
//<button onClick={Logout} style={{fontFamily:'cursive',width: "10%"}}>Log out</button>