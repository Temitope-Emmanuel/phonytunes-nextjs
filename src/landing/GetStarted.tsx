import React from "react"
import {Box,} from "@material-ui/core"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {GetStartedCard} from "../components/Card"

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            alignItems:"center",
            width:"100%",
          },
          bodyContainer:{
            width:"95%",
            margin:"1em auto",
            position:"relative",
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(25em,auto))",
            justifyContent:"center",
            [theme.breakpoints.up("sm")]:{
              gridGap:"3em",
              gridAutoRows:"17.5em",
            },
            gridGap:"1em",
            gridAutoRows:"16em"
          }
    })
)
interface imageProps {
    img:string,
    heading:string,
    content:string
}
interface IProps {
    imageProps?:imageProps[]
}

const GetStarted:React.FC<IProps> = (props) => {
    const classes = useStyles()

    return(
        <Box className={classes.root}>
      <Box className={classes.bodyContainer}>
        {props.imageProps!.map((m,idx) => (
          <GetStartedCard duration={idx*100} {...m} key={idx} />
        ))}
      </Box>
    </Box>       
    )
}

GetStarted.defaultProps = {
    imageProps:[
    {
      img:"/getStarted/active.png",
      heading:"Business Ready",
      content:"With our 24/7 ready assistance we are always ready to do business with you."
    },
    {
      img:"/getStarted/add_to_cart.png",
      heading:"Wide Services",
      content:"Whether is redeeming of gift card or trading of cryptocurreny we are well capable of serving your needs."
    },
    {
      img:"/getStarted/security.png",
      heading:"Top Notch Security",
      content:"We have top notch "
    },
    {
      img:"/getStarted/transfer_money.png",
      heading:"Payment, Transaction, Ease",
      content:"We are well funded and are able to deliver payment as soon as buisness is concluded."
    },
    {
      img:"/getStarted/wallet.png",
      heading:"Real Client, Real Business",
      content:"Our customer services is top notch and will help you along the way"
    },
  ]}
  
  export default GetStarted