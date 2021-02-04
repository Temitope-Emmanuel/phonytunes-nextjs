import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Image from "next/image"
import {Box} from "@material-ui/core"
import MainView from "../src/landing/MainView"
import Atlas from "../src/landing/Atlas"
import GetStarted from "../src/landing/GetStarted"
import Services from "../src/landing/Services"
import {Footer} from "../src/views/Footer"
import {Navbar} from "../src/views/Navbar"
import AOS from "aos"
import "aos/dist/aos.css"

const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            overflowX:"hidden",
          },
          ImageContainer:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            "& img":{
              // width:"100%",
              // height:"100%"
              objectFit:"contain"
            },
            "& div:first-child":{
              width:"45%",
            },
            "& div:nth-child(2)":{
              width:"50%"
            },
            [theme.breakpoints.up("sm")]:{
              flexDirection:"row",
              justifyContent:"space-around",
              "& > *":{
                maxWidth:"45% !important"
              }
            }
          }
    })
)

const backgroundImage = ["phone-app.png",'download.png']


const Home = () => {
  React.useEffect(() => {
    AOS.init({
      easing:"ease-out",
      duration:1500
    })
    
  },[])
    const classes = useStyles()    
    return(
        <Box className={classes.root}>
          <Navbar/>
          <MainView/>
          <Atlas/>
          <GetStarted/>
          <Box className={classes.ImageContainer}>
            <Image width={500} height={500} layout="responsive" data-aos="flip-right" src={`/clusterImg/${backgroundImage[0]}`} />
            <Image width={500} height={500}  layout="responsive" data-aos="flip-left" src={`/clusterImg/${backgroundImage[1]}`} />
          </Box>
          <Services/>
          
          <Footer/>
        </Box>
    )
}

export default Home