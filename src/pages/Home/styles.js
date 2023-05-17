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

`

export const Intro = styled.div`
    width:100%;
    color:${({theme})=>theme.COLORS.LIGHT_300};
    padding:${"clamp(44px, calc(44px + ((100vw - 428px)*0.128)), 164px)"} 16px 62px 36px;

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >div{
        position: relative;

        display:flex;
        flex-direction:column;
        background:${({theme})=>theme.COLORS.GRADIENTS_200};
        width:100%;
        height: ${"clamp(120px, calc(120px + ((100vw - 428px)*0.149)), 260px)"};
        border-radius:${"clamp(3px, calc(3px + ((100vw - 428px)*0.005)), 8px)"};
        padding-top:${"clamp(36px, calc(36px + ((100vw - 428px)*0.055)), 88px)"};
        padding-right:${"clamp(8px, calc(8px + ((100vw - 428px)*0.098)), 100px)"};
        padding-bottom:${"clamp(22px, calc(22px + ((100vw - 428px)*0.074)), 92px)"};
        padding-left:${"clamp(153px, calc(153px + ((100vw - 428px)*0.473)), 598px)"};

        img{
            position: absolute;
            width: ${"clamp(191px, calc(191px + ((100vw - 428px)*0.495)), 656px)"};
            height: ${"clamp(149px, calc(149px + ((100vw - 428px)*0.280)), 412px)"};
            left:${"clamp(-30px, calc(-30px + ((100vw - 428px)*-0.043)), -70px)"};
            bottom:0;
             
        }

        h2{
            font-family: 'Poppins';
            font-weight: 600;
            font-size: ${"clamp(18px, calc(18px + ((100vw - 428px)*0.023)), 40px)"};
            line-height: 140%;
        }
        p{
            font-family: 'Poppins';
            font-weight: 400;
            font-size: ${"clamp(12px, calc(12px + ((100vw - 428px)*0.004)), 16px)"};
        }
    }

    @media(min-width:1020px){
        padding:${"clamp(44px, calc(44px + ((100vw - 428px)*0.128)), 164px)"} 116px 62px 124px;

        div{
            h2{
                font-weight: 500;
            }
            p{
                font-family: 'Roboto';
                font-size: 16px;
            }    
        }
    }
`

export const NewCategory = styled.div`
    margin-left:24px;
    margin-right:16px;
    margin-bottom:${"clamp(24px, calc(24px + ((100vw - 428px)*0.026)), 48px)"};

    display:flex;
    flex-direction:row;
    justify-content:start;
    align-items:center;
    gap:15px;

    label{
        color:${({theme})=>theme.COLORS.LIGHT_300};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size:${"clamp(18px, calc(18px + ((100vw - 428px)*0.015)), 32px)"};
        line-height: 140%;
        min-width:fit-content;      
    }

    input{
        height:32px;
        width:100%;

        background:${({theme})=>theme.COLORS.DARK_200};
        border:none;

        color:${({theme})=>theme.COLORS.LIGHT_100};

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;   

        border-radius:8px;
        padding:12px 14px;

        &::placeholder{
            color:${({theme})=>theme.COLORS.LIGHT_500};
            }

    }

    button{
        height:32px;
        width:130px;
    }

    @media(min-width:1020px){  
        margin-left:123px;
        padding-right:123px;
        }
`
