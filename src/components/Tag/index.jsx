import { Container } from "./styles"

export function Tag({title, active=false, id, ...rest}){



	return(
		
		<Container active={active} {...rest}>
			{title}
		</Container>
		
	)
}