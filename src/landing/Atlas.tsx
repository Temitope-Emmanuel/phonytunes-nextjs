import React from "react"
import {useEffect,useState} from 'react'
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {deepPurple,deepOrange} from '@material-ui/core/colors'
import {AtlasBg,Person1,Person2,Person3,Person4,Person5} from "../../public/world"
import Image from "next/image"

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            position:"relative",
            backgroundImage:`url(world/atlas.png)`,
            height:"50vh",
            width:"100vw",
            backgroundPosition:"center",
            backgroundSize:"contain",
            backgroundRepeat:"no-repeat",
            "& img":{
              filter:"grayscale(60%)",
              transition:"all .25s linear",
              [theme.breakpoints.down("sm")]:{
                height:"4em !important"
              },
              "&:hover":{
                filter:"grayscale(0)"
              }
            },
            "& > div":{
              position:"absolute",
              transition:"all .15s linear",
              "&:hover":{
                borderRadius:"50%",
                transform:"scale(1.15) !important"
              }
            },
            "& div:first-child":{
              left:"30%",
              top:"15%",
              height:"5em",
              width:"5em", 
             },
             "& div:nth-child(2)":{
               left:"43%",
               top:"45%",
               height:"11em",
                width:"11em"
             },
             "& div:nth-child(3)":{
               left:"60%",
               top:"65%",
               height:"6.5em",
                width:"6.5em"
             },
             "& div:nth-child(4)":{
               left:"50%",
               top:"45%",
               height:"3em",
                width:"3em",
             },
             "& div:nth-child(5)":{
               left:"45%",
               top:"10%",
                height:"7em",
                width:"7em"
             }
          },
          container:{
            textAlign:"center",
            "& h2":{
              fontSize:"1.9em",
              fontWeight:"400",
              letterSpacing:".15em",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",      
              backgroundImage:`linear-gradient(to right,${deepOrange[500]},${deepOrange[900]})`,
            },
            "& p":{
              fontSize:"1.3em",
              opacity:".83",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",      
              backgroundImage:`linear-gradient(to bottom,${deepPurple[500]},${deepPurple[900]})`,
            }
          },
          ratesContainer:{
            width:"100%",
            height:"5vh",
            backgroundColor:"black",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
            color:"whitesmoke",
            "& p":{
              margin:theme.spacing(0,1.2),
              fontSize:"1em"
            }
          }
    })
)
type bpi = {
    code:string;
    rate:string
}
type rate = {
    NGN:bpi;
    USD:bpi;
}

let initialState:rate = {
    NGN:{
        code:"NGN",
        rate:"270"
    },
    USD:{
        code:"USD",
        rate:"100"
    }
}

const personImageArr = ["Image15.png","Image16.png","Image17.png","Image18.png","Image19.png"]

const Atlas = () => {
    const classes = useStyles()
    const [rates,setRates] = useState(initialState)

    useEffect(() => {
        const apiCall = async function(){
            fetch(`https://api.coindesk.com/v1/bpi/currentprice/NGN.json`,{
                method:"GET",
              headers:{
                    Accept:"application/json"
                }
            }).then(data => data.json()).then(response => {
              setRates(response.bpi)
            }).catch(err => {})
        }
        apiCall()
    },[])

    return(
        <>
            <Box className={classes.container}>
                <h2 data-aos="zoom-right">24/7 WE GOT YOU</h2>
                <p>Always here to do business with you</p>
            </Box>
            <Box className={classes.root}>
            <Image height="75" width="75" layout="fixed" data-aos="fade" data-aos-delay={700}
                 src={`/world/${personImageArr[0]}`}/>
            <Image height="80" width="80" layout="fixed"  data-aos="fade" data-aos-delay={700} 
               src={`/world/${personImageArr[1]}`}/>
            <Image height="45" width="45" layout="fixed"  data-aos="fade" data-aos-delay={900}
                src={`/world/${personImageArr[2]}`}/>
            <Image height="90" width="90" layout="fixed"  data-aos="fade" data-aos-delay={1000} 
               src={`/world/${personImageArr[3]}`}/>
            <Image height="100" width="100" layout="fixed"  data-aos="fade" data-aos-delay={1100} 
               src={`/world/${personImageArr[4]}`}/>
            </Box>
        </>
    )
}

export default Atlas