import styled from "styled-components"

export const Container = styled.div`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color:${({theme,active})=>active ? theme.COLORS.LIGHT_100 : theme.COLORS.LIGHT_700};
    text-transform:lowercase;

    background-color:${({theme,active})=> active ? theme.COLORS.DARK_1000 : theme.COLORS.DARK_200};
    border:${({theme,active})=>!active && `${theme.COLORS.TINTS_TOMATO_300} 1px solid`} ;
    border-radius:5px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding:${({active})=>active ? `4px 8px` : `2.66px 6.66px`};

    :hover{
        cursor:pointer;
    }
`