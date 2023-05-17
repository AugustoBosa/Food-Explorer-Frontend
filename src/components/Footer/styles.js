import styled from "styled-components"

export const Container = styled.footer`
    width:100%;
    height:77px;
    padding: 0 28px;
    
    display:flex;
    justify-content:space-between;
    align-items:center;

    background-color:${({theme})=>theme.COLORS.DARK_600};  

    animation-name: N-S;
    animation-duration:.7s;
    animation-delay:0.3s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: ${"clamp(8px, calc(8px + ((100vw - 428px)*0.002)), 10px)"};
        text-align: right;

        color:${({theme})=>theme.COLORS.LIGHT_200};  
    }

    @media(min-width:1020px){
        padding: 0 123px;
    }
    
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

export const Logo = styled.div`
    display:flex;
    align-items:center; 
    gap:${"clamp(6px, calc(6px + ((100vw - 428px)*0.004)), 10px)"};
    
    >h1{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: ${"clamp(15px, calc(15px + ((100vw - 428px)*0.010)), 24px)"};
        line-height: 100%;
    }

    >img{
        width: auto;
        height:${"clamp(18px, calc(18px + ((100vw - 428px)*0.013)), 30px)"};
    }
`