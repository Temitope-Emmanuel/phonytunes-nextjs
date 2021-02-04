import React from "react"
import {Box,Link} from "@material-ui/core";
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles";
import {MdAcUnit} from 'react-icons/md';
import {TextField,InputAdornment} from "@material-ui/core"
import {HiOutlineMail} from 'react-icons/hi';
import {SiInstagram,SiWhatsapp,SiFacebook,SiTwitter} from 'react-icons/si';
import {VscLocation} from 'react-icons/vsc';
import {MdPinDrop} from "react-icons/md"
import {FiPhone} from 'react-icons/fi';


const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            height:"auto",
            backgroundImage:`linear-gradient(to bottom,#E17E11,#E25855)`,
            color:"rgba(0,0,0,0.8)",
            "& h3":{
                fontSize:"2em",
                display:"block",
                letterSpacing:".1em",
                fontWeight:400,
                [theme.breakpoints.down("md")]:{
                        fontSize:"1.45em !important"
                }
            }
        },
        footerContainer:{
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            textAlign:"center"
        },
        detailContainer:{
            margin:"1em auto",
            width:"100%",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-evenly",
            alignItems:"start",
            "& > div":{
                width:"40%"
            },
            [theme.breakpoints.down("md")]:{
                flexDirection:"column",
                alignItems:"center",
                textAlign:"center",
                "& > div":{
                    width:"90%"
                }
        }
        },
        title:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            "& svg":{
                fontSize:"2.5em"
            },
            // "& h3":{
            //     margin:theme.spacing(1.5),
            //     fontSize:"2em",
            //     fontWeight:"500",
            //     letterSpacing:".15em"
            // }
        },
        socialContainer:{
            margin:theme.spacing(2,0),
            width:"100%",
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            "& svg":{
                fontSize:"3.8em",
                backgroundColor:"rgba(0,0,0,0.9)",
                color:"#E25855",
                borderRadius:"50%",
                padding:theme.spacing(1),
                [theme.breakpoints.down("md")]:{
                fontSize:"2.5em",
                padding:theme.spacing(.5)
                }    
            }
        },
        contactContainer:{
            margin:theme.spacing(1,0),
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            "& h3":{
                fontSize:"1.5em",
            },
            "& span":{
                display:"flex",
                margin:theme.spacing(.5,0),
                flexDirection:"row",
                alignItems:"center",
                width:"100%",
                justifyContent:"center",
                "& svg":{
                    marginRight:theme.spacing(1.5),
                    fontSize:"2.3em",
                    borderRadius:"50%",
                    color:"black"
                },
                "& p":{
                    fontSize:"1.3em",
                    marginLeft:".1em",
                    color:"rgba(0,0,0,0.9)",
                    fontWeight:"500",
                    wordSpacing:".1em"
                }
            },
            [theme.breakpoints.down("sm")]:{
                "& span":{
                    margin:".0 !important",
                    fontSize:"1em",
                    width:"100vw",
                    "& svg":{
                        fontSize:"1.5em"
                    }
                }
            }
        },
        productContainer:{
            margin:theme.spacing(1,0),
            width:"100%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            "& span":{
                fontSize:"1.3em",
                margin:theme.spacing(1,0),
                fontWeight:"500"
            },
            "& > div":{
                display:"flex",
                width:"100%",
                justifyContent:"space-evenly"
            },
            [theme.breakpoints.down("sm")]:{
                "& > div":{
                    flexDirection:"column",
                    fontSize:".9em",
                    textTransform:"capitalize",
                    "& span":{
                        margin:".2em"
                    }
                }
            }
        },
        linkContainer:{
            width:"90%",
            margin:theme.spacing(1.5,0),
            display:"flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            "& a":{
                textDecoration:"none",
                fontSize:"1.1em",
                color:"black",
                margin:".3em 0",
                fontWeight:"400",
            },
            [theme.breakpoints.down("sm")]:{
                flexDirection:"column"
            }
        }
    })
))


const Footer = function(){
    const classes = useStyles()

    return(
        <Box id="Footer" className={classes.root}>
            <Box className={classes.footerContainer}>
                    <Box className={classes.title}>
                    <MdAcUnit/>
                    <h3>PHONYTUNES</h3>
                    </Box>
                <Box className={classes.detailContainer}>
                    <Box>
                    <Box 
                        // className={classes.formContainer}
                        >
                        <p>Join Our Newletter and get the latest and best deals from phonystore</p>
                        <TextField
                           style={{width:"100%"}}
                            id="outlined-helperText"
                            label="Input Email"
                            defaultValue="Phony@tunes.com"
                            helperText="Some important text"
                            variant="outlined"
                            InputProps={{
                                endAdornment:(
                                    <InputAdornment position="end">
                                        <HiOutlineMail/>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box className={classes.socialContainer}>
                        <SiTwitter/>
                        <SiFacebook/>
                        <SiInstagram/>
                        <SiWhatsapp/>
                      </Box>
                      <Box className={classes.productContainer}>
                        <h3>Products</h3>
                        <Box>
                        <span>Gift Cards</span>
                        <span>Refill</span>
                        <span>Bitcoins</span>
                        <span>Fund Wallet</span>
                        <span>KYC</span>
                        </Box>
                    </Box>
                    </Box>
                    <Box style={{width:"50%"}}>
                    <Box className={classes.contactContainer}>
                        <h3>Contact Information</h3>
                        <span>
                        <VscLocation/>
                        <p>12, Sule Abuka Opebi Rd</p>
                        </span>
                        <span>
                        <MdPinDrop/>
                        <p>Ikeja, Lagos, 100271.</p>
                        </span>
                        <span>
                        <HiOutlineMail/>
                        <p>Phonytunes@gmail.com</p>
                        </span>
                        <span>
                        <FiPhone/>
                        <p>(+234) 702 6290 389</p>
                        </span>
                    </Box>
                </Box>
                </Box>
                        <h3>Quick Links</h3>
                    <Box className={classes.linkContainer}>
                        <Link href="/">
                            <a>RATES</a>
                        </Link>

                        <Link href="/">
                            <a>BLOG</a>
                        </Link>

                        <Link href="/">
                            <a>REFERRAL PROGRAM</a>
                        </Link>

                        <Link href="/">
                            <a>CONTACT US</a>
                        </Link>

                        <Link href="/">
                            <a>TERMS AND POLICIES</a>
                        </Link>
                        
                    </Box>
                <Box className={classes.footerContainer}>
                <p>
                    Copyright Temitope Emmanuel Ojo 2020.
                    All rights reserved
                </p>                    
                </Box>
            </Box>
        </Box>
    )
}


export default Footer