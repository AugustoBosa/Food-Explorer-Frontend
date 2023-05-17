import styled from "styled-components";

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
    overflow-y:auto;
    overflow-x:hidden;
    padding-left:24px;

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

    >main{

        >h1{
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 32px;
            line-height: 140%;
            color: ${({theme})=>theme.COLORS.LIGHT_300};
            margin-top:34px;
            margin-bottom:32px;
        }

        >div{
            display: flex;
            flex-direction: row;
            gap:${"clamp(24px, calc(24px + ((100vw - 428px)*0.026)), 48px)"};
            flex-wrap:wrap;
        }

    }
    
    @media(min-width: 1020px){
        padding-left:123px;
    }

`


