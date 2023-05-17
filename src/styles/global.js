import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }

    body{
        background-color:${({theme}) => theme.COLORS.DARK_400};
        color:${({theme})=> theme.COLORS.LIGHT_400};

        font-size:16px;
        font-family:'Poppins', sans-serif;
        font-weight:400;

        width:100%;
        min-width:428px;
        height:100vh;
    }

    body,input,button,textarea{
        outline:none;
    }
    
    ul{
        list-style:none;
    }
    a{
        text-decoration:none;
    }

    button,a{
        cursor:pointer;
        transition:filter 0.3s;
    }
    button:hover,a:hover{
        filter:brightness(0.8);
    }
`