import styled from "styled-components"

export const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    gap:8px;

    font-family:'Roboto',sans-serif;
    font-weight:400;
    font-size: 16px;

    >div{
        height:48px;
        width:100%;

        border-radius:8px;
        padding:12px 14px;

        background-color:${({theme})=>theme.COLORS.DARK_900};
        color:${({theme})=>theme.COLORS.LIGHT_100};

        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:left;
        gap:14px;
        
        p{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color:${({theme})=>theme.COLORS.LIGHT_100};

        }

        input{
            width:100%;
            height:100%;
            background:transparent;
            border:none;

            color:${({theme})=>theme.COLORS.LIGHT_100};

            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            
            &::placeholder{
                color:${({theme})=>theme.COLORS.LIGHT_500};
            }

            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }
        }

        img{
            width:24px;
            height:24px;
        }

       span{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;

        color:${({theme})=>theme.COLORS.LIGHT_100};
       }
    }
   
`