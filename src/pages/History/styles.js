import styled from "styled-components"

export const Container = styled.div`
    height:100vh;
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:start;
    align-items:left;
    overflow-y:auto;
    width:100%;
    height:100%;

    align-self:center;
    padding: 16px 0 33px 23px;

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

    .desktop{
        display:none;
    }

    >h1{
        color:${({theme})=>theme.COLORS.LIGHT_300};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size:${"clamp(18px, calc(18px + ((100vw - 428px)*0.015)), 32px)"};
        line-height: 140%;
    }

   
    >div{
        margin-top:8px;
        min-height:130px;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:top;
        
        width:100%;

        gap:16px;
        overflow-x:auto;
        flex-wrap:wrap;
    }

    >table{
        width:fit-content;
        border-collapse: collapse;
        border-top:1px solid ${({theme})=>theme.COLORS.DARK_1000};
        border-right:1px solid ${({theme})=>theme.COLORS.DARK_1000};
        border-left:1px solid ${({theme})=>theme.COLORS.DARK_1000};

        margin:34px auto 50px;
        height:fit-content;



        tr{
            border-bottom:1px solid ${({theme})=>theme.COLORS.DARK_1000};
            th{
                width:fit-content;
                border-left:1px solid ${({theme})=>theme.COLORS.DARK_1000};
                padding:16px 24px;
                background-color:${({theme})=>theme.COLORS.DARK_600};
                &:first-child{
                    border-left:none;
                }
            }
            }

            td{
                border-left:1px solid ${({theme})=>theme.COLORS.DARK_1000};
                &:first-child{
                    border-left:none;
                }
            }
            
        }
    

    @media(min-width: 1020px){
        .desktop{
            display:unset;
        }

        .mobile{
            display:none;
        }
    }

    `