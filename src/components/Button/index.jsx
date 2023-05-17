import { Container } from "./styles"

export function Button({title, icon, ...rest}){
    return(

        <Container type="button" {...rest}>
            <div>
                {icon && <img src={icon}/>}
                <span>{title}</span>
            </div>
        </Container>
    )

}