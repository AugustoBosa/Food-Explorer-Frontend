import styled from "styled-components"

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    gap:8px;
    width:300px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    border:${({theme})=>theme.COLORS.DARK_1000} 1px solid;
    border-radius: 8px;

    padding:8px;
`

export const Details = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    
    width:100%;

    >span{
        width:100%;

        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;

        div{
            border-radius:50%;
            height:8px;
            width:8px;
        }

        .Aberto{
            background:${({theme})=>theme.COLORS.LIGHT_400};
            border:1px ${({theme})=>theme.COLORS.TINTS_MINT_100} solid;
        }
        .Pendente{
            background:${({theme})=>theme.COLORS.TINTS_TOMATO_300};
        }
        .Preparando{
            background:${({theme})=>theme.COLORS.TINTS_CARROT_100};
        }
        .Entregando{
            background:${({theme})=>theme.COLORS.TINTS_MINT_100};
        }
        .Finalizado{
            background:${({theme})=>theme.COLORS.TINTS_CAKE_100};
        }
        .Cancelado{
            background:${({theme})=>theme.COLORS.DARK_1000};
            border:1px ${({theme})=>theme.COLORS.TINTS_TOMATO_300} solid;
        }

    }
`

export const Info = styled.div`
    font-size: 12px;
    width:100%;
    display:flex;
    flex-direction:column;
    height:100%;
    max-width:200px;

    >p{
        overflow-wrap: break-word;

        >span{
            color:${({theme})=>theme.COLORS.TINTS_CARROT_100};
        }
    }

    >span{
        margin-top:4px;
        width:100%;
        text-align:right;
    }
`

