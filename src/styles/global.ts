import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    font-size:62.5%;
}

 :focus-visible{
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]};;
}

body{
    background: ${(props) => props.theme["gray-900"]} ;
    color: ${(props) => props.theme["gray-300"]} ;
        -webkit-font-smoothing: antialiased;
}

body, input, button , textarea{
    font-family: 'roboto', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
}
`;
