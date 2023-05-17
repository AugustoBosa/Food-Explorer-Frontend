import { Container,Options } from "./styles"

import PlusIcons from "../../assets/plus.svg"
import CloseIcon from "../../assets/close.svg"


export function TagEdit({isNew=false, value, onChange, onClick, onClickButton, onClickOption, options=[], ...rest}){

    return(
        <Container  isNew={isNew} >
            {isNew ?
            <input 
                type="text"
                value={value}
                readOnly={!isNew} 
                onChange={onChange}
                
                list="options"
                
                {...rest}
            />
            :
            <span onClick={onClick}>{value}</span>
            }

            <button 
                type="button" 
                onClick={onClickButton}
                className={isNew?"button-add":"button-delete"}
            >
                {isNew ? <img className="button-add" src={PlusIcons} />  : < img className="button-delete" src={CloseIcon} />}
            </button>

            <Options 
                className={ isNew ?"show-options" : "hidden-options"}
            >
                {options.length <=5 && options.map(
                    option=>(
                        <option 
                            key={option.id} 
                            value={option.name}
                            onClick={onClickOption}
                        >    
                            {option.name}      
                        </option>
                    )
                )}

            </Options>

        </Container>
    )
}