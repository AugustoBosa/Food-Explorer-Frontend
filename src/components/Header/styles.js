import styled from "styled-components"

export const Container = styled.div`
    grid-area:header;

    width:100%;
    padding:56px 28px 24px;
    background-color:${({theme})=>theme.COLORS.DARK_700};
    height:114px;

    display:grid;
    grid-template-areas:
    "menu logo order";
    justify-content:space-between;
    align-content:center;
    gap:32px;

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;
 
    .desktop{
        display:none;
    } 

    .menu{
        grid-area:menu;

        background:transparent;
        border:none;

        display:flex;
        align-items:center;
        justify-content:center;
    }
    
    .orders{
        grid-area:order;

        display:flex;
        align-items:center;
        justify-content:center;
       
    >div{
        position:relative;

        div{
            background-color:${({theme})=>theme.COLORS.TINTS_TOMATO_100};
            width:20px;
            height:20px;
            position:absolute;
            top:-7px;
            right:-7px;

            border-radius:50%;

            display:flex;
            align-items:center;
            justify-content:center;

            span{
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                color:${({theme})=>theme.COLORS.LIGHT_100};
            }
        }
    }

        :hover{
            cursor:pointer;
        }
    }


    @media(min-width:1020px){
        height:104px;
        padding:0px 123px ;
        grid-template-areas:
        "logo search order menu";
        grid-template-columns: auto 1fr 216px 24px;
        align-content:center;
        justify-content:left;

        .desktop{
            display:unset;
        }

        .orders{
            margin:-4px;
            min-width: 216px;
            height: 56px;
        }

        .mobile{
            display:none;
        }
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
    grid-area:logo;
    
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;

    gap:${"clamp(8px, calc(8px + ((100vw - 428px)*0.002)), 10px)"};
    
    >img{
        width: ${"clamp(24px, calc(24px + ((100vw - 428px)*0.006)), 30px)"};
        height:${"clamp(24px, calc(24px + ((100vw - 428px)*0.006)), 30px)"}; 
    }

    >div{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        gap:${"clamp(8px, calc(8px + ((100vw - 428px)*0.002)), 10px)"};

        h1{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: ${"clamp(21px, calc(21px + ((100vw - 428px)*0.007)), 28px)"};
            line-height: 115%;

            text-align:center;
        }

        span{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 160%;

            text-align:center;

            color:${({theme})=>theme.COLORS.TINTS_CAKE_200};
        }
    
        :hover{
            cursor:pointer;
        }
    }
    

    

    @media(min-width:1020px){
        margin-right:11px;

        .adminLogo{
            margin-bottom:14px;
        }

        >div{
            flex-direction:column;
            gap:0;

            h1{
                height:28px;
            }
            span{
                height:20px;
                width:100%;
                text-align:right;
                margin-top:-6px;
            }
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

export const Options = styled.ul`
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