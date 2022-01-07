let initialState = {
    loginSuccess:false,
}

//Login reducer that takes initial state, action to perform as parameters and performs the appropriate action and returning the new state.
function LoginReducer(state=initialState, action){
    switch(action.type){
        case 'loginSuccess':
            return{
                ...state,
                loginSuccess: true
            }
        case 'loginFail':
            return{
                ...state,
                loginSuccess: false        
            }
        
        default: return state    

    }
    
}


export default LoginReducer;