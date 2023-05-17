import styled from "styled-components"

export const Container = styled.div`
    width:100%;
    height:100vh;
    
    display:flex;
    flex-direction:column;
    align-items:center;
    
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

export const Header = styled.header`
    width:100%;

    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:${"clamp(16px, calc(16px + ((100vw - 428px)*0.017)), 32px)"};

    padding-top:56px;
    padding-bottom:24px;

    color:${({theme})=>theme.COLORS.LIGHT_100};
    background-color:${({theme})=>theme.COLORS.DARK_700};

    
    animation-name: N-S;
    animation-duration:.7s;
    animation-delay:0.3s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: ${"clamp(21px, calc(21px + ((100vw - 428px)*0.022)), 42px)"};
        line-height: 110%;
    }

    >button{
        background-color:transparent;
        border:none;

        display:flex;
        justify-content:center;
        align-items:center;

        margin-left:${"clamp(28px, calc(28px + ((100vw - 428px)*0.101)), 123px)"};
        
        img{
            color:${({theme})=>theme.COLORS.LIGHT_100};
            width:${"clamp(18px, calc(18px + ((100vw - 428px)*0.019)), 36px)"};
            height:${"clamp(18px, calc(18px + ((100vw - 428px)*0.019)), 36px)"};
        }
    }
`

export const Main = styled.main`
    width:100%;
    height:100%;

    overflow-y:auto;

    padding-left:${"clamp(28px, calc(28px + ((100vw - 428px)*0.101)), 123px)"};
    padding-right:${"clamp(28px, calc(28px + ((100vw - 428px)*0.101)), 123px)"};
    padding-bottom:40px;

    display:flex;
    flex-direction:column;
    align-items:top;
    justify-content:flex-start;
    gap:32px;
    margin-top:36px;

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

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

    @media(min-width:1020px){
       
        display:flex;
        flex-direction:row;
        align-items:top;
    }
`

export const UserInfo = styled.form`
    width:100%;
    max-width:475px;
    box-sizing:content-box;
    margin:0 auto 0 auto;
    height:fit-content;

    display:flex;
    flex-direction:column;
    gap:24px;

    >h2{
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        text-align:center;
        display:none;
    }

    >button{
        margin-top:24px;
        min-height:48px;
    }

    @media(min-width:1020px){
        background-color:${({theme})=>theme.COLORS.DARK_700};
        border-radius: 16px;  
        padding:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};

        >h2{
            display:unset;
        }
    }
`

export const Preferences = styled.form`

    width:100%;
    height:100%;
    height:fit-content;

    display:flex;
    flex-direction:column;
    gap:24px;

    >h2{
        font-family: 'Poppins';
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        text-align:center;
        display:none;
    }

    @media(min-width:1020px){
        background-color:${({theme})=>theme.COLORS.DARK_700};
        border-radius: 16px;  
        padding:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};

        >h2{
            display:unset;
        }
    }
`

export const Tags = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:24px;
    height:100%;

    >div{
        span{
            &:hover{
              cursor:pointer;
            }
        }
    }

    @media(min-width:1020px){
        gap:12px;
    }
`