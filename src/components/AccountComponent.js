import React from 'react';
import {useHistory} from "react-router-dom";
import { user_real } from './Login';


function Account() {
    const history=useHistory();
    console.log(user_real)
    /*const Logout=()=>{
        history.push("/login");
    }*/
    return(
        <div className="container">
            <div className="row">
                <h1> Hello {user_real}</h1>
                <br/>
                
            </div>    
        </div>
    );
}

export default Account;
//<button onClick={Logout} style={{fontFamily:'cursive',width: "10%"}}>Log out</button>