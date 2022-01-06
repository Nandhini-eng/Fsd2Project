import React, { Component,useState } from 'react';
import './login.css'
let userrs

let error,user_real

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:null
        }
        userrs=props.regusers.regusers
        console.log(userrs)
    }
    login(){
        console.warn(this.state)
        fetch("http://localhost:3001/regusers?q=" + this.state.username + ":" + this.state.password).then((data)=>{
            data.json().then((resp)=>{
                console.warn("resp",data)
                console.log(this.state.length)
                if(resp.length>0){

                    //this.props.history.push('home')
                    user_real=this.state.username
                    this.props.history.go(-2);
                    error=" "
                    console.log(this.props.history.length)
                }
                else{
                    error="Invalid Username or Password"
                }
            })
        })
    
        // var i
        // var j=0
        // console.log(userrs.length)
        // for(i=0;i<userrs.length;i++){
        //     const val = userrs[i].user4.includes(this.state.username+':'+ this.state.password);   
        //     if(val){
        //         j=1
        //         user_real=this.state.username
        //         error=" "
        //     }
        //     if(j==1){
        //         this.props.history.go(-2);
        //     }
        // } 
    }
    render(){
    
        return(
            <div style={{paddingLeft:"400px", paddingTop:"50px",paddingBottom:'80px',background: '#f2f2f2'}}>
                <div className='form-1' style={{backgroundColor: 'white'}}>
                    <div className='login'>
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
                        <input name="username" id="uname" required onChange={(event)=>this.setState({username:event.target.value})}/><br/>
                    </div>
                    <div className="inner-form">
                        <label for="pswd">PASSWORD</label>
                        <br/>
                        <input type="password" name="password" id="pswd" required onChange={(event)=>this.setState({password:event.target.value})}/><br/>
                    </div>
                    <div className='login' style={{fontFamily:'cursive',paddingLeft:'70px'}}>
                        <button onClick={()=>{this.login()}} type="button" style={{fontFamily:'cursive',width: "15%"}}>Login</button>
                    </div>
                </div>
            </div>

            
        )
    }
}

export  {Login,user_real};
