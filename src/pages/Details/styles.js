import styled from "styled-components"


export const Container = styled.div`
    height:100vh;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:start;
    align-items:left;
    overflow-y:auto;
    width:100%;
    
    align-self:center;
    padding: 16px 56px 33px;

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;

    >button{
        background-color:transparent;
        border:none;
        color:${({theme})=>theme.COLORS.LIGHT_300};
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 140%;

        height: 34px;
        width:fit-content;

        display:flex;
        align-items:center;
        justify-content:left;
        gap:11px;

        margin: 32px 0 16px;
    }

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

    @media(min-width:1020px){
        padding: 24px 121px 100px;
        max-width:1500px;

        >button{
            font-weight: 700;
            margin: 0 0 42px;
        }
    }
`

export const Dish = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:start;
    align-items:center;
    align-self:center;
    gap:16px;
    width:100%;


    >img{
        height:${"clamp(264px, calc(264px + ((100vw - 428px)*0.134)), 390px)"};
        width:${"clamp(264px, calc(264px + ((100vw - 428px)*0.134)), 390px)"};
    }

   >div{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:24px;

        font-family: 'Poppins';
        font-style: normal;

        h1{
            width:100%;
            font-weight: 500;
            font-size: ${"clamp(27px, calc(27px + ((100vw - 428px)*0.014)), 40px)"};
            line-height: 140%;
            text-align:center;
        }

        p{  
            font-weight: 400;
            font-size: ${"clamp(16px, calc(16px + ((100vw - 428px)*0.009)), 24px)"};
            line-height: 140%;
            text-align:center;
        }


        >form{
                gap:16px;
                width:100%;
                display:flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                margin-top:24px;


            >button{
                    height:${"clamp(38px, calc(38px + ((100vw - 428px)*0.011)), 48px)"};
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 500;
                    font-size: ${"clamp(10px, calc(10px + ((100vw - 428px)*0.004)), 14px)"};
                    line-height: 160%;
                    align-self:center;
                    justify-self:center;
                    max-width:188px;


                    img{
                        height:21px;
                        width:21px;
                    }
            }

            .edit{
                max-width:100%;
                height:48px;
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
            }
        }
}


   @media(min-width:1020px){
        flex-direction:row;
        justify-content:start;
        gap:48px;

        >div{
            h1{
                text-align:left;
            }

            p{
                text-align:left;
                width:100%;
            }

            >form{
                gap:33px;
                justify-content:left;
                
                >button{
                    width:162px;
                }

                .edit{
                    width:131px;
                }
               
                &> button img{
                        display:none;
                        height:0;
                        width:0;
                }
            }    
        }
   }
`

export const Tags = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:24px;

    @media(min-width:1020px){
        gap:12px;

    }
`

export const Controls = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;   

    gap:16px;
    
    button{
        width:28px;
        height:28px;
        background:transparent;
        border:none;
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center; 

        img{
            height:24px;
            width:24px;
            align-self:center;
         }
    }

    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 36px; 
    }
            
    @media(min-width:1020px){
        gap:12px;        
    }
`
