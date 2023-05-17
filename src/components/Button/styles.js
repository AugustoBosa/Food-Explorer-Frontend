import styled from "styled-components"

export const Container = styled.button`
    width:100%;
    height:56px;

    border:0;
    border-radius:5px;
    padding:0 16px;

    font-family:'Poppins',sans-serif;
    font-weight:500;

    background-color:${({theme})=>theme.COLORS.TINTS_TOMATO_100};
    color:${({theme})=>theme.COLORS.LIGHT_100};

    >div{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        gap:5px;
    }
    
    &:disabled{
        filter:brightness(1);
        background-color:${({theme})=>theme.COLORS.TINTS_TOMATO_400};

        :hover{
            cursor:unset;
        }
    }

  
`