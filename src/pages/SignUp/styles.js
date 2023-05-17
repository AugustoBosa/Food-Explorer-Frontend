import styled from "styled-components"

export const Container = styled.div`
    width:100%;

    display: flex;
    justify-content: center;
    align-content: top;    

    @keyframes NW-SE{
        0%{
            opacity: 0;
            transform: translate(-30px, -30px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }
`

export const Main = styled.main`
    width:100%;

    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:left;
    gap:73px;

    width:316px;

    @media(min-width:1020px){
        align-items:center;

        width:100%;
        gap:${"clamp(73px, calc(73px + ((100vw - 1024px)*0.677)), 306px)"};

        flex-direction:row;
        justify-content:center;

        margin:140px 108px 0 154px;
    }
`

export const Header = styled.header`
    height:100%;
    display:flex;
    flex-direction:row;
    justify-content:left;
    align-items:top;
    align-self:left;
    gap:${"clamp(10px, calc(10px + ((100vw - 428px)*0.01)), 19px)"};

    padding-top:${"clamp(158px, calc(158px + ((100vw - 1024px)*0.267)), 250px)"};

    animation-name: NW-SE;
    animation-duration:.7s;
    animation-delay:0.3s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >h1{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: ${"clamp(37px, calc(37px + ((100vw - 428px)*0.005)), 42px)"};
        line-height: 115%;
    }

    >img{
        width: ${"clamp(44px, calc(44px + ((100vw - 428px)*0.005)), 49px)"};
        height:${"clamp(44px, calc(44px + ((100vw - 428px)*0.005)), 49px)"};
    }

    @media(min-width:1020px){
        >h1{
            min-width:250px;
        }
    }

`

export const Form = styled.form`
    width:${"clamp(316px, calc(316px + ((100vw - 428px)*0.17)), 476px)"};
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:flex-start;
    gap:32px;
    padding:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};
    padding-left:0;
    margin-bottom:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};

    animation-name: NW-SE;
    animation-duration:.5s;
    animation-delay:.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >h1{
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 32px;
        line-height: 45px;
        text-align:center;
        display:none;
    }

    @media(min-width:1020px){
        background-color:${({theme})=>theme.COLORS.DARK_700};
        border-radius: 16px;  
        padding-left:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};

        >h1{
            display:unset;
        }
    }
`