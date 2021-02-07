import React from "react"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box,Slide,Collapse} from "@material-ui/core"
import {Message} from "../Message"
import {IChat} from "../../../core/models"
import {Button,Typography,IconButton,Input,FormControl,InputAdornment} from "@material-ui/core"
import UseInputState from "../../../utils/useInputState"
import {MdQuestionAnswer} from 'react-icons/md';
import {RiSendPlaneFill} from 'react-icons/ri';
import {GiCancel} from 'react-icons/gi';
import {AlertContext} from "../../../components/Snackbar/SnackContext"
import { deepOrange} from "@material-ui/core/colors"
import getUser from "../../../utils/userAuth"
import {FirebaseContext} from "../../../firebase"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            width:"100%",
            position:"relative",
            maxHeight:"35em",
            display:"flex",
            "& svg":{
                color:"rgba(0,0,0,.9)",
                borderRadius:"50%",
                width:theme.spacing(7),
                height:theme.spacing(7),
                padding:theme.spacing(1),
                cursor:"pointer"
            }
        },
        commentContainer:{
            overflowY:"auto",
            maxHeight:"30em",
            minHeight:"10em",
            width:"100%",
            marginBottom:theme.spacing(7)
        },
        SlideContainer:{
            width:"100%",
            // position:"absolute",
            // borderRadius:"5.4em",
            // bottom:".1em",
            // display:"flex",
            // flexDirection:"row",
            // justifyContent:"center",
            // alignItems:"center",
            // backgroundColor:"transparent",
            // overflowX:"hidden"
        },
        inputContainer:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row",
            padding:theme.spacing(0,2)
        }
    })
))

interface IProps {
    chats:IChat[];
    transactionId:string;
    updateTransaction:(arg:any) => void
}


const ChatList:React.FC<IProps> = ({chats,transactionId,updateTransaction,...props}) => {
    const classes = useStyles()
    // const [isVisible,setIsVisible] = React.useState(false)
    const {currentUser} = getUser()
    const [text,handleText,resetText] = UseInputState("")
    const [showChat,setShowChat] = React.useState(false)
    const [submit,setSubmitting] = React.useState(false)
    // const handleVisible = () => {
    //     setIsVisible(!isVisible)
    // }    
    const handleSubmitToggle = () => {
        setSubmitting(!submit)
    }
    const toggleChat = () => {
        setShowChat(!showChat)
    }
    const handleSubmit = async (e:any) => {
        handleSubmitToggle()
        const newChat:IChat = {
            author:currentUser.uid,
            body:text,
            createdAt:new Date()
        }
        await updateTransaction({chats:[...chats,newChat]})
        resetText()
        handleSubmitToggle()
    }
    const deleteMessage = (id:string) => () => {
        const filteredChat = [...chats]
        const foundIdx = filteredChat.findIndex(item => item.id !== id)
        filteredChat.splice(foundIdx,1)
        updateTransaction({chats:[filteredChat]})
    }
    
    return(
        <>
            <Button onClick={toggleChat} variant="outlined" style={{
                color:deepOrange["A200"],
                marginTop:"3px"
            }} >{showChat ? "Hide Chats" : "Show Chats"}</Button>
        <Box className={classes.root}>
        <Collapse style={{
            width:"100%"
        }} in={showChat}>
            <Box className={classes.commentContainer}>
            {
            chats.length ? chats.map(m => (
                <Message deleteMessage={deleteMessage(m.id)} key={m.id} message={m}/>
            )) : 
            <Typography variant="body1">
                No Message available 
            </Typography> }
            </Box>
            <Box className={classes.SlideContainer}>
                <FormControl  style={{margin:".4em"}} className={classes.inputContainer}>
                     <Input name="comment"
                        required={true}
                        disabled={submit}
                      onChange={handleText}
                      onKeyPress={(e) => e.which === 13 && handleSubmit(e)}
                      value={text}
                      autoFocus={true}
                      placeholder="Input message"
                      style={{padding:".3em"}}
                      />
                </FormControl>
            </Box>
        </Collapse>
        </Box>
        </>
    )
}

export default ChatList