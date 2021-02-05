import React from "react"
import {Box, DialogActions, DialogContent, DialogTitle} from "@material-ui/core"
import Link from "next/link"
import useRouter from "next/router"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Typed from "react-typed"
import {Button,Typography,IconButton,ButtonGroup,List,ListItem,ListItemAvatar,Avatar,ListItemText} from "@material-ui/core"
import { deepOrange } from "@material-ui/core/colors"
import useUserAuth from "../utils/userAuth"
import {Dialog} from "../components/Dialog"
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {FcGoogle} from "react-icons/fc"
import {FaTwitter,FaFacebookSquare} from "react-icons/fa"
import firebaseContext from "../firebase/context"
import {AlertContext} from "../components/Snackbar/SnackContext"
import {IAccount} from "../core/models"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const useStyles = makeStyles((theme:Theme) => 
    createStyles({
        root:{
            height:"75vh",
            width:"100%",
            display:"flex",
            justifyContent:"center",
            alignItems:"start",
            flexDirection:"column",
            position:"relative",
            "& > div:first-child":{
                backgroundAttachment:"fixed",
                position:"absolute",
                height:"100%",
                width:"100%",
                "& div":{
                    height:"100%",
                    width:"100%",
                    backgroundSize:"cover,contain,contain,contain",
                    backgroundRepeat:"no-repeat,repeat",
                    backgroundPosition:"center,center",
                    backgroundBlendMode:"hard-light,multiply",

                },
                "& img":{
                    objectPosition:"center",
                    objectFit:"cover",
                    pointerEvents:"none"
                }
            },
            "& h1":{
                fontSize:"1.3em",
                whiteSpacing:"nowrap",
                WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to right,black,${theme.palette.primary.dark})`,
                letterSpacing:".2em",
                fontWeight:"400",
                textTransform:"uppercase",
                margin:".2em 0",
                marginBottom:".5em",
                marginLeft:"-10px",
                position:"relative",
                zIndex:2,
                [theme.breakpoints.up("md")]:{
                    margin:"1em 0",
                    fontSize:"2.5em"
                }
            },
            "& h2":{
                textTransform:"capitalize",
                WebkitBackgroundClip:"text",
                position:"relative",
                zIndex:2,
                fontSize:"1.1em",
                WebkitTextFillColor:"transparent",      
                backgroundImage:`linear-gradient(to right,black,${theme.palette.primary.dark})`,
                [theme.breakpoints.up("sm")]:{
                    fontSize:"1.5em"
                }
            },
            "& button":{
                height:"auto",
                fontSize:"1.3em",
                "& a":{
                    textDecoration:"none",
                    color:"inherit",
                    margin:" 0 .9em"
                },
                [theme.breakpoints.down("sm")]:{
                    width:"auto",
                    fontSize:"1.1em",
                    "& a":{
                        margin:"0 0"
                    }
                }    
            }
        }
    })
)

const imageUrl = ["phonyweb-01.png","phonyweb-02.png","phonyweb-03.png","phonyweb-04.png","phonyweb-05.png"]
const backgroundImage = ["backgroundImg.png",'backgroundImg2.png']

interface optionType {
    icon:any;
    func:() => void;
    title:string
}

interface SignupDialogProps {
    handleToggle:() => void;
    title?:string;
    options:optionType[]
}


const SignupDialog:React.FC<SignupDialogProps> = ({handleToggle,title,options}) => {
    
    return(
        <>
            {title && 
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            }
            <DialogContent>
            <List>
            {options.map((item,idx) => (
                  <ListItem button key={idx} onClick={item.func}>
                  <ListItemAvatar>
                    <Avatar>
                      <IconButton>
                          {item.icon}
                      </IconButton>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title} />
                </ListItem>  
            ))}
            </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleToggle} color="primary">
                Cancel
              </Button>
              <Button onClick={handleToggle} color="primary">
                Subscribe
              </Button>
            </DialogActions>
        </>
    )
}


const MainView = () => {
    const classes = useStyles()
    const [index,setIndex] = React.useState(1)
    const alert = React.useContext(AlertContext)
    const {currentUser} = useUserAuth()
    const firebaseClass = React.useContext(firebaseContext)
    const [open,setOpen] = React.useState(false)
    const router = useRouter
    const handleToggle = () => {
        setOpen(!open)
    }

    const createNewUser = authUser => {
        console.log("this is the google user",authUser)
        const {user} = authUser
        const newUser:IAccount = {
            username:user?.displayName,
            email:user.email,
            roles:[],
            referralNumber:firebaseClass.generateReferral(),
            createdAt:firebaseClass.createTimeStamp(),
            cards:[],
            referralCount:0,
            pictureUrl:user.photoURL ? user.photoURL : ""
        }
        firebaseClass.createNewUser(newUser).then(() => {
            alert.handleOpen({
                type:"success",
                message:"User Logged in Successful"
            })
            router.push(`/user/${user.uid}`)
        })
    }

    const signInWithGoogle = () => {
        firebaseClass.signInWithGoogle().then(createNewUser).catch(err => {
            console.log("there's been an err",err)
            alert.handleOpen({
                type:"error",
                message:`Something went wrong:${err.message}`
            })
        })
    }
    const signInWithFacebook = () => {
        firebaseClass.signInWithFacebook().then(createNewUser).catch(err => {
            console.log("there's been an err",err)
            alert.handleOpen({
                type:"error",
                message:`Something went wrong:${err.message}`
            })
        })
    }
    const signInWithTwitter = () => {
        firebaseClass.signInWithTwitter().then(createNewUser).catch(err => {
            console.log("there's been an err",err)
            alert.handleOpen({
                type:"error",
                message:`Something went wrong:${err.message}`
            })
        })
    }

    const signInOptions = [
        {
            icon:<FcGoogle/>,
            func:signInWithGoogle,
            title:"Sign in with Google"   
        },
        {
            icon:<FaTwitter/>,
            func:signInWithTwitter,
            title:"Sign in with Twitter"
        },
        {
            icon:<FaFacebookSquare/>,
            func:signInWithFacebook,
            title:"Sign in with Facebook"
        }
    ]


    return(
        <>
        <Box className={classes.root}>
            <AutoPlaySwipeableViews index={index} onChangeIndex={setIndex}>
                {imageUrl.map((item,idx) => (
                    <Box key={idx} style={{backgroundImage:`url(brandImage/${item}),url(main/${backgroundImage[0]}),url(main/${backgroundImage[1]})`}}></Box>
                ))}
            </AutoPlaySwipeableViews>
            {/* <h2 data-aos="fade" data-aos-delay={500}>Do you want to&nbsp;
                <Typed
                strings={[
                    "trade Gift Card ?","buy bitcoin ?","transact cryptocurrency ?"
                ]}
                typeSpeed={40}
                backSpeed={70}
                loop
                />
            </h2>
                <h1 data-aos="fade" data-aos-delay={600}>Welcome to PHONYTUNES</h1> */}
                <ButtonGroup data-aos="fade" data-aos-delay={800}>
                    <Button style={{
                    backgroundColor:"rgba(0,0,0,1)",
                    color:deepOrange[900]}}>    
                        {currentUser ?
                        <Link data-aos="fade" data-aos-delay={1000} href={`/user/${currentUser.uid}`} >
                            Profile
                        </Link>:
                        <Typography onClick={handleToggle} >
                            SIGN UP 
                        </Typography>}
                    </Button>
                <Button data-aos="fade" data-aos-delay={1500} style={{color:"rgba(0,0,0,1)",backgroundColor:deepOrange[900]}}>
                    <a href="https://wa.me/2348096045108">
                    TRADE NOW
                    </a>
                </Button>
                </ButtonGroup>
        </Box>
        <Dialog open={open} handleToggle={handleToggle}>
            <SignupDialog options={signInOptions} handleToggle={handleToggle} />
        </Dialog>
        </>
    )
}


export default MainView