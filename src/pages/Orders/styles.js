import styled from "styled-components"

export const Container = styled.div`
    height:100vh;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
   
    @keyframes N-S{
        0%{
            opacity: 0;
            transform: translate(0, -30px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }
`

export const Content = styled.div`
    height:100%;
    width:100%;
    overflow-y:auto;
    overflow-x:hidden;

    padding:32px 123px 32px 123px;
    
    &::-webkit-scrollbar {
        width: 8px;
        height: 1px;
        background-color: ${({theme})=>theme.COLORS.DARK_300};
        border-radius:4px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${({theme})=>theme.COLORS.LIGHT_700};
        border:1px solid ${({theme})=>theme.COLORS.DARK_600};

        border-radius:4px;
    }

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >h2{
        margin-top:32px;
        color:${({theme})=>theme.COLORS.LIGHT_300};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size:${"clamp(18px, calc(18px + ((100vw - 428px)*0.015)), 32px)"};
        line-height: 140%;
    }

    >section{
        margin-top:8px;
        min-height:130px;
        display:flex;
        flex-direction:row;
        justify-content:start;
        align-items:top;

        gap:16px;
        overflow-x:auto;
        flex-wrap:wrap;
    }
    
    @media(min-width: 1020px){
       
    }
`


