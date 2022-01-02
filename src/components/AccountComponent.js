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
        <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`}}>
        <div className="container">
            <div className="row">
                <h1 style={{color:"white"}}> Hello {user}</h1>
                <br/>
                
            </div>    
        </div>
        </div>
    );
}

export default Account;
//<button onClick={Logout} style={{fontFamily:'cursive',width: "10%"}}>Log out</button>