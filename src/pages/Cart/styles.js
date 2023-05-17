import styled from "styled-components";

export const Container = styled.div`
    height:100vh;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
   
    @keyframes N-S{
        0%{
            opacity: 0;
            transform: translate(0, -30px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }
`

export const Content = styled.div`
    height:100%;
    width:100%;
    overflow-y:auto;
    overflow-x:hidden;
    display:flex;
    flex-direction:row;
    padding:0 ${"clamp(35px, calc(35px + ((100vw - 428px)*0.149)), 123px)"};
    justify-content:center;
 
    > .active{
            display:unset;
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

    animation-name: N-S;
    animation-duration:.5s;
    animation-delay:0.5s;
    animation-fill-mode: backwards;
    animation-timing-function: linear;


    @media(min-width: 1020px){
        gap:100px;

        #ordersSection,#paymentSection{
            display:unset;
        }
        .mobile{
            display:none;
        }
    }
`

export const OrdersList = styled.div`
width:fit-content;
display:none;
min-height:400px;
min-width:300px;
margin-bottom:50px;

h1{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 140%;
    color: ${({theme})=>theme.COLORS.LIGHT_300};
    margin:56px 0 27px;
}

h2{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;
    color: ${({theme})=>theme.COLORS.LIGHT_300};
    margin-top:18px;
}

>button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 32px;
    height:48px;
    width:216px;

    margin-top:31px;
    margin-left:140px;    

}

@media(min-width: 1020px){
   h1{
       margin:34px 0 32px;
   } 

}
 
`

export const PaymentSection = styled.div`
display:none;

h1{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 140%;
    color: ${({theme})=>theme.COLORS.LIGHT_300};
    margin:34px 0 32px;

}

` 

export const PayMethods = styled.div`
    min-width:355px;
    min-height:324px;
    padding-bottom:50px;

    nav{
        height:81px;
        width:100%;

        background-color:${({theme})=>theme.COLORS.DARK_500};

        display:flex;
        flex-direction:row;

        button{
            display:flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            gap:8px;

            background-color:transparent;
            border:none;
            color:${({theme})=>theme.COLORS.LIGHT_100};
            width:100%;
            height:100%;

            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 100%;

            border:${({theme})=>theme.COLORS.LIGHT_600} 1px solid;

            img{
                width:24px;
                z-index:0;
            }
        
            :first-child{
                border-right:none;
                border-radius:6px 0 0 0;
            }
            :last-child{
                border-radius: 0 6px 0 0;
            }   
        }

        .active{
            background-color:${({theme})=>theme.COLORS.DARK_800};
        }    
    }

    >div{
        height:100%;
        border:${({theme})=>theme.COLORS.LIGHT_600} 1px solid;
        border-top:none;
        border-radius: 0 0 6px 6px;

        label{
            margin-bottom:8px;
        }

        img{
            height:166px;
            justify-self:center;
            margin:0 auto;
            width:100%;
            display:none;
            padding:37px 0 37px;
            box-sizing:content-box;

            :hover{
                cursor:pointer;
            }
        }

        form{
            display:none;
            flex-direction:column;
            
            height:100%;
            width:100%;
            padding:57px 27px;

            >div{
                display:flex;
                flex-direction:column;
                width:fit-content;
                padding: 0 27px;
                margin-bottom:37px;
                                

                input{
                    background:transparent;
                    border: 1px solid ${({theme})=>theme.COLORS.LIGHT_100};
                    border-radius: 5px;
                    padding: 12px 14px;
                    height: 48px;
                    color: ${({theme})=>theme.COLORS.LIGHT_300};

                    &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                    }
                    ::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                    }

                    ::placeholder{
                        color:  ${({theme})=>theme.COLORS.LIGHT_500};
                    }
                }
            }

            >div:nth-child(2){
                flex-direction:row;
                align-items:center;
                justify-content:center;
                gap:17px;
                margin-bottom:37px;

                &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
                }

                div{
                    display:flex;
                    flex-direction:column;
                }
            }

            #cardNumber{
                width: 300px;
            }
            #cardValidDate{
                width:144px;
            }
            #cardCVC{
                width:139px;
            }

            >button{
                width: 300px;
                height: 48px;
                align-self:center;
            }
        }

        .active{
            display:flex;
        }
    }

         .paymentProcess{
                width:100%;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                padding:110px 20px;

            span{

                color:${({theme})=>theme.COLORS.LIGHT_400};
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 160%;
                text-align: center;
            }

            img{
                height:96px;
                filter:brightness(0.7);
                padding:0 0 24px;
            }
        }
`

export const Item = styled.div`
    display:flex;
    flex-direction:row;
    gap:13px;
    margin:16px 0;

    img{
        width:72px;
        height:72px;
    }

    div{
        display:flex;
        flex-direction:column;
        align-items:left;
        justify-content:center;

        p{
            display:flex;
            flex-direction:row;
            align-items:center;
            gap:10px;

            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            color: ${({theme})=>theme.COLORS.LIGHT_300};

            span{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                text-align:center;
                color: ${({theme})=>theme.COLORS.LIGHT_400};
            }
        }

        >span{
            text-decoration: line-through;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;

            color:${({theme})=>theme.COLORS.LIGHT_400};
        }

        button{
            background-color:transparent;
            border:none;
            color:${({theme})=>theme.COLORS.TINTS_TOMATO_400};

            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 160%;

            width:min-content;
        }
    }
`