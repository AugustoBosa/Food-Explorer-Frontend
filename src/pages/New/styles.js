import styled from "styled-components"

export const Container = styled.div`
    height:100vh;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

export const Content = styled.main`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:left;

    padding: 0 32px;
  
    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    overflow-y:auto;
    overflow-x:hidden;

    &::-webkit-scrollbar {
        width: 8px;
        height: 1px;
        background-color: ${({theme})=>theme.COLORS.DARK_300};
        border-radius:4px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${({theme})=>theme.COLORS.LIGHT_700};
        border:1px solid ${({theme})=>theme.COLORS.DARK_600};
        border-radius:4px;
    }

    >button{
        background-color:transparent;
        border:none;
        color:${({theme})=>theme.COLORS.LIGHT_300};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;

        height: 23px;
        width:fit-content;

        display:flex;
        align-items:center;
        justify-content:left;
        gap:0px;

        margin: 10px 0 35px;

        img{
            height:22px;
            width:auto;
        }
    }

    >h1{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 140%;

        color:${({theme})=>theme.COLORS.LIGHT_300};
        margin-bottom:24px;
    }

    input{
        background-color:${({theme})=>theme.COLORS.DARK_800};
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
    }
`

export const Info = styled.form`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:start;
    align-items:left;
    gap:${"clamp(24px, calc(24px + ((100vw - 428px)*0.009)), 32px)"};
    margin-bottom:55px;

    >div{
        display:flex;
        flex-direction:column;
        justify-content:start;
        align-items:left;
        gap:24px;   
    }

    .addDish{
        min-height:48px;
    }

    .dishImg{
        input{
            display:none;
        }
    }

    @media(min-width:1020px){
        width:100%;
        
        >div{
            flex-direction:row;

            :last-child{
                justify-content:right;
            }
        }

        .dishImg{
            width:22%;
        }
        .dishName{
            width:44%;
        }
        .dishCategory{
            width:34%;
        }
        .dishIngredients{
            width:77%;
        }
        .dishPrice{
            width:23%;
        }
        .addDish{
            max-width:172px;
        } 
    } 
`

export const Select = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    gap:8px;

    >label{
        font-family:'Roboto',sans-serif;
        font-weight:400;
        font-size: 16px;
    }

    >select{
        width:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:left;

        height:48px;
        width:100%;

        border-radius:8px;
        padding:12px 14px;

        background-color:${({theme})=>theme.COLORS.DARK_900};
        color:${({theme})=>theme.COLORS.LIGHT_100};
        border:none;

        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:left;
        gap:14px;

        :focus{
            outline:none;
        }

        &::placeholder{
                color:${({theme})=>theme.COLORS.LIGHT_500};
        }
    } 
` 

export const Ingredients = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    gap:8px;
    
    >label{
        font-family:'Roboto',sans-serif;
        font-weight:400;
        font-size: 16px;
    }

    >div{
        display:flex;
        align-items:left;
        justify-content:center;
        flex-wrap:wrap;

        height:fit-content;;
        width:100%;

        border-radius:8px;
        padding:12px 14px;

        background-color:${({theme})=>theme.COLORS.DARK_900};
        color:${({theme})=>theme.COLORS.LIGHT_100};
        border:none;

        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:left;
        gap:14px;
    }
`

export const TextArea = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
    gap:8px;

    >label{
        font-family:'Roboto',sans-serif;
        font-weight:400;
        font-size: 16px;
    }

    >textarea{
        width:100%;
        min-height:172px;
        resize:none;

        display:flex;
        flex-direction:column;
        align-items:left;
        justify-content:center;
        gap:14px;

        height:48px;
        width:100%;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;

        border-radius:8px;
        padding:12px 14px;

        background-color:${({theme})=>theme.COLORS.DARK_900};
        color:${({theme})=>theme.COLORS.LIGHT_100};
        border:none;

        &::placeholder{
                color:${({theme})=>theme.COLORS.LIGHT_500};
        }
    }
`