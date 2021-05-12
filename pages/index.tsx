import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Image from "next/image"
import { Box } from "@material-ui/core"
import MainView from "../src/landing/MainView"
import Atlas from "../src/landing/Atlas"
import GetStarted from "../src/landing/GetStarted"
import Services from "../src/landing/Services"
import { Footer } from "../src/views/Footer"
import { Navbar } from "../src/views/Navbar"
import { ICoinDetail } from "core/models/CoinDetail"
import {IoMdArrowDropdown,IoMdArrowDropup} from "react-icons/io"
import AOS from "aos"
import "aos/dist/aos.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflowX: "hidden",
    },
    '@keyframes marquee': {
      '0%': { left: 0 },
      '100%': { left: '-100%' }
    },
    ImageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        // width:"100%",
        // height:"100%"
        objectFit: "contain"
      },
      "& div:first-child": {
        width: "45%",
      },
      "& div:nth-child(2)": {
        width: "50%"
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        justifyContent: "space-around",
        "& > *": {
          maxWidth: "45% !important"
        }
      }
    },
    marquee:{
      minHeight: "80px",
      width: "100%",
      overflow: "hidden",
      position: "relative",
      "& > div":{
        display: "flex",
        width: "200%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        animation: "$marquee 10s linear infinite",
        "& > div":{
          float: "left",
          width: "min-content"
        }
      }
    },
    marqueeContainer:{
      borderRadius:"1px",
      "& > div":{
        border:"1px solid #eff2f5",
        "& svg":{
          fontSize:"1.5rem"
        },
        "& > div":{
          margin:theme.spacing(0,2),
          alignItems:'center',
          "& span":{
            whiteSpace:"nowrap"
          },
          display:"flex",
          "& > *":{
            margin:theme.spacing(0,1)
          },
          "& > div:first-child":{
            display:"flex",
            alignItems:"center",
            "& div":{
              display:"flex",
              flexDirection:"column",
              alignItems:"flex-start",
              "& span:first-child":{
                fontWeight:"bold",
              },
              "& span:nth-child(2)":{
                fontWeight:"ligher",
                
              }
            }
          }
        },
      }
    }
  })
)

const backgroundImage = ["phone-app.png", 'download.png']


const Home = () => {
  const classes = useStyles()
  const [coinDetail, setCoinDetail] = React.useState<ICoinDetail[]>([])
  React.useEffect(() => {
    AOS.init({
      easing: "ease-out",
      duration: 1500
    })
    const getCryptoStat = () => {

      fetch("/api/getCrypto", { method: "GET" })
        .then(response => response.json())
        .then(result => {
          return setCoinDetail((result.data.data as ICoinDetail[]).map(item => ({
            ...item,
            quote: {
              ...item.quote,
              USD: {
                ...item.quote.USD,
                price: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', maximumSignificantDigits: 7 })
                  .format(item.quote.USD.price as number)
              }
            }
          })))
        })
        .catch(error => console.log('error', error));

    }
    getCryptoStat()
  }, [])


  return (
    <Box className={classes.root}>
      <Navbar />
      <MainView />
      <div className={`marquee ${classes.marqueeContainer} ${classes.marquee}`}>
        <div>
          {
            coinDetail.map((item, idx) => (
              <div key={idx} className="m-2 border-gray-50 rounded-sm">
                <div>
                  {/* <FaEthereum /> */}
                  <div>
                    <span>{item.name}</span>
                    <span>{item.symbol}</span>
                  </div>
                </div>
                <div>
                  <span>
                    {item.quote.USD.price}
                  </span>
                  <div className={`flex items-center justify-between ${item.quote.USD.percent_change_24h < 0 ? "text-red-500" : "text-green-500"}`} >
                    {
                      item.quote.USD.percent_change_24h < 0 ?
                        <IoMdArrowDropdown /> :
                        <IoMdArrowDropup />
                    }
                    <span>
                      {`${item.quote.USD.percent_change_24h.toPrecision(3)}%`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Atlas />
      <GetStarted />
      <Box className={classes.ImageContainer}>
        <Image width={500} height={500} layout="responsive" data-aos="flip-right" src={`/clusterImg/${backgroundImage[0]}`} />
        <Image width={500} height={500} layout="responsive" data-aos="flip-left" src={`/clusterImg/${backgroundImage[1]}`} />
      </Box>
      <Services />
      <Footer />
    </Box>
  )
}

export default Home