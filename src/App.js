import React, { Component,useState} from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import styled,{ThemeProvider} from 'styled-components';
import {lightTheme,darkTheme,GlobalStyles} from './components/themes.js'

const store = ConfigureStore();
const StyledApp=styled.div`
color: ${(props) => props.theme.fontColor};
`;;

function App(){
  
   
    const [theme,setTheme]=useState("light");
    const themeToggler=()=>{
    theme==='light'?setTheme('dark'):setTheme('light');
     };
    
    return (
      
      <Provider store={store}>
  
        <BrowserRouter>
          <ThemeProvider theme={theme==="light"?lightTheme:darkTheme}>
            <GlobalStyles/>
            
          <StyledApp>

            {/* <button onClick={()=>themeToggler()}>change mode</button> */}
            <Main />
            
            </StyledApp>
          
          </ThemeProvider>
        </BrowserRouter>
        
      </Provider>
    );
  }

  export default App;
  