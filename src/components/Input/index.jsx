import { Container } from "./styles"


export function Input({icon, prefix, title, className, id, alternativeText, ...rest}){

    function clickWork(){
        document.getElementById(id).click();
    }
    return(
        <Container className={className}>

            {title && 
            <label htmlFor={id}>
                {title}
            </label>}

            <div onClick={clickWork}>
                {icon && <img src={icon} size={24}/>}
                {prefix && <p>{prefix}</p>}
                <input id={id} {...rest}/>
                {alternativeText && <span>{alternativeText}</span>}
            </div>

        </Container>
    )
}