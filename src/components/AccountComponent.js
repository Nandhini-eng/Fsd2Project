import React from 'react';
import { user_real } from './Login';
console.log(user_real)
//My account function
function Account() {
    console.log(user_real)
    //Logout function
    const Logout=()=>{
        //clearing local storage for logout
        localStorage.clear();
        //Redirecting to login page after logout
        window.location.href='/login'
        
    }
    return(
        <div className="container">
            <div className="row">
                <h1> Hello {user_real}</h1>
                <h2 style={{paddingLeft:'20px'}}><button style={{fontFamily:'cursive',width: "10%",fontSize:'15px'}} onClick={Logout}>Logout</button></h2>
                <br/>
                
            </div>    
        </div>
    );
}

export default Account;