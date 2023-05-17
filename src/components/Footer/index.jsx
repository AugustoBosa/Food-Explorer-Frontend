import { Container, Logo } from "./styles"

import GrayHexagon from "../../assets/grayHexagon.svg"

export function Footer(){
    return(

        <Container>
            <Logo>
                <img src={GrayHexagon} alt="Logo - Hexágono cinza." />

                <h1>food explorer</h1>
            </Logo>

            <span>© 2023 - Todos os direitos reservados.</span>

        </Container>
    )
}