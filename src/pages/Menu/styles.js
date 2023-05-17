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
    padding-top:36px;

    padding-left:${"clamp(28px, calc(28px + ((100vw - 428px)*0.101)), 123px)"};
    padding-right:${"clamp(28px, calc(28px + ((100vw - 428px)*0.101)), 123px)"};

    display:flex;
    flex-direction:column;

    >input{
        align-self:center;
    }

    @media(min-width:1020px){
        padding:0;
        
       >div{
            display:none;
       }
    }

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;
`

export const Options = styled.ul`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    line-height: 140%;
    gap:46px;
    display:flex;
    flex-direction:column;

    box-sizing:content-box;

    padding-top:36px;

    color:${({theme})=>theme.COLORS.LIGHT_300};

   >li{
        padding-left:10px;
        width:100%;
        font-size: ${"clamp(24px, calc(24px + ((100vw - 428px)*0.003)), 36px)"};

   }

   >li:last-child{
        padding-bottom:10px;
        border-bottom:1px solid ${({theme})=>theme.COLORS.DARK_1000};
   }

   >li:hover{
        cursor:pointer;
        color:${({theme})=>theme.COLORS.LIGHT_400};
   }

   @media(min-width:1020px){
        width:100%;
        margin:auto auto;
        border:1px solid  ${({theme})=>theme.COLORS.DARK_1000};
        border-radius:12px;
        background-color:${({theme})=>theme.COLORS.DARK_700};
        padding:${"clamp(32px, calc(32px + ((100vw - 1024px)*0.093)), 64px)"};

        max-width:400px;

       >li{
         text-align:left;
         border:none;
       }
       >li:last-child{
        border-bottom:none;;
   } 
    }
`

export const Search = styled.div`
    grid-area:search;
    position:relative;

    display:flex;
    justify-content:center;
    align-items:center;
    
    height:48px;
    width:100%;
`

export const SearchOptions = styled.ul`
    position:absolute;
    top:44px;
    right:0px;
    height:content;
    width:100%;
    padding:16px;

    border-radius:8px;
    z-index:2;

    color:${({theme})=>theme.COLORS.LIGHT_500};
    background:${({theme})=>theme.COLORS.DARK_900};
   
    display:${({active})=>active? "flex" : "none"};
    flex-direction:column;
    justify-content:space-between;
    align-items:left;
    gap:8px;

    div{
        display:flex;
        justify-content:left;
        align-items:center;
        gap:16px;


        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;

        img{
            height:32px;
            width:32px;
            border-radius:50%
        }
        h3{
            text-transform:lowercase;
        }
     
        span{
            font-style: italic;
            font-size:12px;
        }

        :hover{
            cursor:pointer;
            color:${({theme})=>theme.COLORS.LIGHT_400};    
        }
    }
`