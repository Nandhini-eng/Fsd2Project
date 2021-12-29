import {createGlobalStyle} from 'styled-components';


const white = "#fff";
const black = "#161617";
const gray = "#f8f8f9";

export const lightTheme = {
  fontColor:black,
  body: white,
  card:'gray'
};

export const darkTheme = {
  fontColor:white,
  body: black,
  card:'gray'
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;

