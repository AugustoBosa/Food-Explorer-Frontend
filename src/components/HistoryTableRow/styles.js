import styled from "styled-components"

export const Container = styled.tr`

height:100%;
    

    td{
        display:table-cell;
        padding:16px 24px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        height:inherit;

        &.status{
            display:flex;
            align-items:center;
            justify-content:left;
            gap:8px;

        }

        div{
            
            border-radius:50%;
            height:8px;
            width:8px;

         &.Aberto{
            background:${({theme})=>theme.COLORS.LIGHT_400};
            border:1px ${({theme})=>theme.COLORS.TINTS_MINT_100} solid;
        }
         &.Pendente{
            background:${({theme})=>theme.COLORS.TINTS_TOMATO_300};
        }
         &.Preparando{
            background:${({theme})=>theme.COLORS.TINTS_CARROT_100};
        }
         &.Entregando{
            background:${({theme})=>theme.COLORS.TINTS_MINT_100};
        }
         &.Finalizado{
            background:${({theme})=>theme.COLORS.TINTS_CAKE_100};
        }
         &.Cancelado{
            background:${({theme})=>theme.COLORS.DARK_1000};
            border:1px ${({theme})=>theme.COLORS.TINTS_TOMATO_300} solid;
        }
        }
     
    }

`