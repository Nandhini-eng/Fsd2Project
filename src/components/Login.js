
import { useState } from "react";
import axios from "axios";
import {ConfigureStore} from "./../redux/ConfigureStore";
import {useHistory} from "react-router-dom";
import './login.css'
const store = ConfigureStore();
let user,error,res
error="Invalid Username or Password"
function Login(){
    const[username1,setUsername]=useState("");
    const[password1,setPassword]=useState("");
    const history=useHistory();
    const LoginUser=()=>{
        user=username1
        
        axios.post("/login",{username: username1,password: password1}).then((res)=>{
            console.log(username1)
            store.dispatch({type: "loginSuccess"});
            res=true
            console.log(res)
            let path = '/home'
            error=" "
            history.goBack();
            console.log(history)
        }).catch((err)=>{
            store.dispatch({type: "loginFail"});
            res=false
            console.log(res)
            
            
        })
    };
    return (
    
            <div style={{paddingLeft:"400px", paddingTop:"50px",paddingBottom:'80px',background: '#f2f2f2'}}>
                <div className="form-1" style={{backgroundColor: 'white'}} >
                    <div>
                    <h1>Welcome back</h1>
                    <h4>It's great to see you back here</h4>
                    <br/>
                    <h3>Login to continue further</h3>
                    <br/>
                    </div>
                    <div className="error">
                    {error}
                    </div>
                        <div className="inner-form">
                        <label for="uname">USERNAME</label>
                        <br/>
                        <input  type="username"    id="uname" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="inner-form">
                        <label>PASSWORD</label>
                        <br/>
                        <input  type="password"  onChange={(e)=>setPassword(e.target.value)}/><br/>
                        </div>
                        <div style={{fontFamily:'cursive',paddingLeft:'70px'}}>
                    <button  type="button" onClick={LoginUser} style={{fontFamily:'cursive',width: "15%"}}>Login</button>
                    </div>
                        
                    
                </div>
                
            </div>

    )
}

export  {Login,user,res};