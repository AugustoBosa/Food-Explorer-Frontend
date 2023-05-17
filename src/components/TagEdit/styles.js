import styled from "styled-components";

export const Container = styled.div`
    position:relative;
    width:${({isNew})=>isNew && "150px"};
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:32px;  

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;

    background-color:${({theme,isNew})=>isNew? "transparent":theme.COLORS.LIGHT_600};
    color:${({theme})=>theme.COLORS.LIGHT_100};
    border:${({theme,isNew})=>isNew? `1px dashed ${theme.COLORS.LIGHT_500}`:"none"};

    border-radius:8px;
    padding:10px 16px;

    >button{
        height:16px;
        width:16px;
        border:none;
        background:none;

        img{
            height:8px;
            width:8px;
        }
    }

    .button-delete{
        color:${({theme})=>theme.COLORS.LIGHT_100};  
    }
    .button-add{
        color:${({theme})=>theme.COLORS.LIGHT_500};
    }

    >input,span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        text-align:center;
        width:100%;  
        
        color:${({theme})=>theme.COLORS.LIGHT_100};
        background:transparent;
        
        cursor:${({isNew})=>!isNew && "unset"};   
        border:none;

        &::placeholder{
            color:${({theme})=>theme.COLORS.LIGHT_500};
        }

    }

    >Input:focus ~ ul.show-options{
        display:unset;
    }

    >.show-options{
        display:none;
    }
    >.show-options:hover{
        display:unset;

    }
    >.hidden-options{
        display:none;
    }
`
export const Options = styled.ul`
    position:absolute;
    top:31px;
    left:0px;
    height:content;
    min-width:100%;
    width:fit-content;
    padding:2px 16px;

    border-radius:8px;
    color:${({theme})=>theme.COLORS.LIGHT_500};
    background:${({theme})=>theme.COLORS.DARK_900};
        
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:left;

    option{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;

        text-transform:lowercase;

        :hover{
            cursor:pointer;
            color:${({theme})=>theme.COLORS.LIGHT_400};
        }
    }

`

