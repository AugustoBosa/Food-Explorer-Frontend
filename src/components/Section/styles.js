import styled  from "styled-components"

export const Container = styled.section`
    display:flex;
    flex-direction:column;
    align-items:left;
    gap:24px;
    margin-left:24px;
    margin-bottom:${"clamp(24px, calc(24px + ((100vw - 428px)*0.026)), 48px)"};
    position:relative;

    >span{
        display:flex;
        align-items:center;
        justify-content:start;
        gap:8px;

        >h2{
            color:${({theme})=>theme.COLORS.LIGHT_300};
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size:${"clamp(18px, calc(18px + ((100vw - 428px)*0.015)), 32px)"};
            line-height: 140%;
        }

        >div{
            display:flex;
            align-items:center;
            justify-content:start;
            gap:8px;

            button{
                background-color:transparent;
                border:none;
                width:20px;
                height:20px;

                img{
                    width:16px;
                    height:16px;
                }
            }
        }

        >p{
            color:${({theme})=>theme.COLORS.LIGHT_400};
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            
            font-size:12px;
        }
    }

    >div{
        display:flex;
        flex-direction:row;
        align-items:center;
        gap:${"clamp(12px, calc(12px + ((100vw - 428px)*0.003)), 15px)"};
        overflow-x:hidden;
        scroll-behavior: smooth;
        padding-right:${"clamp(140px, calc(140px + ((100vw - 428px)*0.066)), 202px)"};
        
        min-width:${"clamp(404px, calc(404px + ((100vw - 428px)*0.764)), 1000px)"};

        .rightShadow{
            position:absolute;
            right:10px;
            bottom:0px;
        
            width:  ${"clamp(105px, calc(105px + ((100vw - 428px)*0.050)), 152px)"};
            height: ${"clamp(292px, calc(292px + ((100vw - 428px)*0.181)), 462px)"};
            background-color:transparent;

            button{
                position:absolute;
                right:0px;
                z-index:1;
                background-color:transparent;
                border:none;
                width:50%;
                height:100%;
                padding:30px;
                
                display:flex;
                justify-content:right;
                align-items:center;

                img{
                    height:${"clamp(14px, calc(14px + ((100vw - 428px)*0.015)), 28px)"};
                    width:${"clamp(8px, calc(8px + ((100vw - 428px)*0.015)), 16px)"};
                   
                }
            }
         }

         .leftShadow{
            position:absolute;
            left:-2px;
            bottom:0px;
        
            width:  ${"clamp(105px, calc(105px + ((100vw - 428px)*0.050)), 152px)"};
            height: ${"clamp(292px, calc(292px + ((100vw - 428px)*0.181)), 462px)"};
            background-color:transparent;
            transform: matrix(-1, 0, 0, 1, 0, 0);
           
            button{
                position:absolute;
                right:0px;
                z-index:1;
                background-color:transparent;
                border:none;
                width:50%;
                height:100%;

                padding:30px;

                
                display:flex;
                justify-content:right;
                align-items:center;

                img{
                    height:${"clamp(14px, calc(14px + ((100vw - 428px)*0.015)), 28px)"};
                    width:${"clamp(8px, calc(8px + ((100vw - 428px)*0.015)), 16px)"};
                   
                }
            }
         }

    } 

    @media(min-width:1020px){  
        margin-left:123px;
        margin-right:123px;
        padding-right:0;
        overflow-x:hidden;
        
        >div{
            padding-left:${"clamp(105px, calc(105px + ((100vw - 428px)*0.050)), 152px)"};

            .rightShadow{
                background:${({theme})=>theme.COLORS.GRADIENTS_100};
                right:0px;
            }
            .leftShadow{
                background:${({theme})=>theme.COLORS.GRADIENTS_100};
            }
        }
    }
`