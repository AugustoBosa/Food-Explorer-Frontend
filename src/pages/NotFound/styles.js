import styled from "styled-components"
import Lost from "../../assets/lost.jpg"

export const Container = styled.div`
    padding:30px;
    width:30%;
    min-width:250px;
    height:100vh;
    width:100vw;
    background-image: url(${Lost});
    background-size: cover;
    background-position: center;

    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        gap:15px;
        
    h1{
        text-align:center;
        color:${({theme})=>theme.COLORS.DARK_1000};
    }

    button{
        color:unset;
    }
}
`