import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    gap: ${"clamp(12px, calc(12px + ((100vw - 428px)*0.003)), 15px)"};

    min-width:${"clamp(210px, calc(210px + ((100vw - 428px)*0.100)), 304px)"};
    width: ${"clamp(210px, calc(210px + ((100vw - 428px)*0.100)), 304px)"};
    min-height:${"clamp(292px, calc(292px + ((100vw - 428px)*0.181)), 462px)"};
    height: ${"clamp(292px, calc(292px + ((100vw - 428px)*0.181)), 462px)"};

    background: ${({theme})=>theme.COLORS.DARK_200};
    border: 1px solid ${({theme})=>theme.COLORS.DARK_300};
    border-radius: 8px;
    padding:24px;

    position:relative;
  
    >div{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        text-overflow: ellipsis;
        gap: ${"clamp(12px, calc(12px + ((100vw - 428px)*0.003)), 15px)"};

        >img{
            height:${"clamp(88px, calc(88px + ((100vw - 428px)*0.094)), 176px)"};
            width:${"clamp(88px, calc(88px + ((100vw - 428px)*0.094)), 176px)"};
        }

        >div{
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap: ${"clamp(12px, calc(12px + ((100vw - 428px)*0.003)), 15px)"};
            text-align: center;
             

            h3{
                font-family: 'Poppins';
                font-weight: 500;
                font-size: ${"clamp(14px, calc(14px + ((100vw - 428px)*0.011)), 24px)"};
                text-align:center;
                color:${({theme})=>theme.COLORS.LIGHT_300};
            }

            p {
                font-family: 'Roboto';
                font-weight: 400;
                font-size: 14px;
                color: ${({ theme }) => theme.COLORS.LIGHT_400};

                height: 44px;
                width:100%;

                white-space: wrap;
                text-overflow: ellipsis;
              
}
        }
        
        >span{
            font-family: 'Roboto';
            font-weight: 400;
            font-size: ${"clamp(16px, calc(16px + ((100vw - 428px)*0.017)), 32px)"};
            line-height: 160%;

            color:${({theme})=>theme.COLORS.TINTS_CAKE_200};
        }
    }  
    
    >form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:16px;
        width:100%;
        max-width:162px;

        button{
            height: ${"clamp(32px, calc(32px + ((100vw - 428px)*0.017)), 48px)"};
        }
    }

    .favorite, .edit{
        width: 24px;
        height: 22px;

        position:absolute;
        right:18px;
        top:18px;

        background:transparent;
        border:none;

        img{
            height:100%;
            width:100%
        }
    }

    .desktop{
        display:none;
    }

    @media(min-width:1020px){

        >div{
            height:100%;
            justify-content:center;
            
            div{
                h3{
                    font-weight: 700;
                }
            }  
        }

        >form{
            flex-direction: row;

            button{
                max-width:92px;
            }
        }
        
        .desktop{
            display:unset;
        }

    }
`

export const Controls = styled.div`
    height:32px;

    display: flex;
    justify-content:center;
    align-items: center;
    gap:16px;

    width:100%;

    >span{
        font-family: 'Roboto';
        font-weight: 400;
        font-size:  ${"clamp(16px, calc(16px + ((100vw - 428px)*0.004)), 20px)"};
    }

    >button{
        color:${({theme})=>theme.COLORS.LIGHT_100};

        display: flex;
        align-items: center;
        justify-content:center;

        background:transparent;
        border:none;

        height: ${"clamp(18px, calc(18px + ((100vw - 428px)*0.006)), 24px)"};
        width: ${"clamp(18px, calc(18px + ((100vw - 428px)*0.006)), 24px)"};

        img{
            height:100%;
            width:100%
        }
    }

    @media(min-width:1020px){
        >span{
            font-weight: 700;
        }
    }
`
