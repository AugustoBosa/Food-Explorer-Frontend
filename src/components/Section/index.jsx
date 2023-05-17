import { Container } from "./styles"

import RightArrow from "../../assets/rightArrow.svg"
import EditIcon from "../../assets/pencil.svg"
import CloseIcon from "../../assets/close.svg"


export function Section({title, children, id, onLoad, isRemovable=true, onClickDelete, onClickUpdate, isAdmin=false, ...rest}){

function handleScrollRight(){
    const reference =  document.querySelector(".dishItem")
    document.getElementById(id).scrollLeft += reference.offsetWidth*0.66+8;
}

function handleScrollLeft(){
    const reference =  document.querySelector(".dishItem")
    document.getElementById(id).scrollLeft -= reference.offsetWidth*0.66+8;
}


    return(

        <Container  {...rest}>

            <span>
                <h2>{title}</h2>
                {isAdmin && 
                   <div>
                        <button onClick={onClickUpdate}><img src={EditIcon} alt="" /></button>
                       {isRemovable && <button onClick={onClickDelete}><img src={CloseIcon} alt="" /></button>} 
                   </div>

                }
            </span>
            
            <div id={id} onLoad={onLoad}>
                {children}

                <div className="rightShadow">
                    <button onClick={handleScrollRight}>
                        <img src={RightArrow}></img>
                    </button>
                </div>

                <div className="leftShadow">
                    <button onClick={handleScrollLeft}>
                        <img src={RightArrow}></img>
                    </button>
                </div>
                
            </div>

          
        </Container>

    )
}