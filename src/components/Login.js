import React, { Component } from 'react';
import './login.css'
import { Button } from "reactstrap"
import { baseUrl } from '../shared/baseUrl';

let userrs
let error, user_real

error = ''

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: null
        }
        //array which stores registered users details
        //userrs = props.regusers.regusers
    }
    login() {
        console.warn(this.state)
        fetch(baseUrl+"users/user/" + this.state.username + "+" + this.state.password).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", data)
                console.log(resp.length)
                //If details found in server then redirect to page that redirected login page else stay in same page 
                if (resp.length > 0) {
                    user_real = this.state.username
                    this.props.history.go(-2);
                }
                else {
                    alert('Invalid username or password')
                }
            })
        })


    }
    render() {

        return (
            <div className='log'>
                <div style={{ paddingLeft: "400px", paddingTop: "50px", paddingBottom: '80px' }}>
                    {/* Form to take login */}
                    <div className='form-1' style={{ backgroundColor: 'white' }}>
                        <div>
                            <h1>Welcome back</h1>
                            <h4>It's great to see you back here</h4>
                            <br />
                            <h3>Login to continue further</h3>
                            <br />
                        </div>
                        <div className="error">
                            {error}
                        </div>
                        {/* Username field */}
                        <div className="inner-form">
                            <label for="uname">USERNAME</label>
                            <br />
                            <input name="username" id="uname" required onChange={(event) => this.setState({ username: event.target.value })} /><br />
                        </div>
                        {/* Password field */}
                        <div className="inner-form">
                            <label for="pswd">PASSWORD</label>
                            <br />
                            <input type="password" name="password" id="pswd" required onChange={(event) => this.setState({ password: event.target.value })} /><br />
                        </div>
                        {/* Submit button */}
                        <div style={{ fontFamily: 'cursive', paddingLeft: '70px' }} className='zoom'>
                            <Button onClick={() => { this.login() }} type="button" style={{ fontFamily: 'cursive', width: "15%", paddingBottom: "5px" }}>Login</Button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export { Login, user_real };
