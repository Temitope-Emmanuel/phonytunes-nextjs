import React from "react"
import {makeStyles,Theme,createStyles} from "@material-ui/core/styles"
import {Box} from "@material-ui/core"
import {IChat} from "../../../core/models"
import {Avatar,Collapse,IconButton,Typography} from "@material-ui/core"
import {MdHighlightOff} from 'react-icons/md';
import {IoIosArrowBack} from 'react-icons/io';
import {red} from "@material-ui/core/colors"
import getUser from "../../../utils/userAuth"
import {formatDistanceToNow} from "date-fns"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            display:"flex",
            flexDirection:"row",
            alignItems:"flex-end",
            margin:theme.spacing(2,0),
            width:"100%",
            "& button":{
                padding:"0 0"
            },
            "& svg":{
                transition:"transform .5s linear",
                margin:theme.spacing(.5)
            }
        },
        large: {
            width: theme.spacing(4),
            height: theme.spacing(4),
          },
          commentContainer:{
              display:"flex",
              alignItems:"center",
              flexDirection:"row"
          },
        dateContainer:{
            display:"block",
            fontSize:".9em",
            opacity:".6",
            alignSelf:"flex-end",
            margin:theme.spacing(0,1)
        },
        actionContainer:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            width:"3em",
            height:"9em"
        }
    })
))


interface IProps {
    message:IChat;
    deleteMessage:() => void;
}

const Message:React.FC<IProps> = ({message,deleteMessage}) => {
    const classes =  useStyles()
    const {currentUser} = getUser()
    const [deleteSlide,setDeleteSlide] = React.useState(false)

    const handleSlide = () =>{
        setDeleteSlide(!deleteSlide)
    }

    return(
        <Box style={{
            flexDirection:currentUser ? "row-reverse" : "row"
        }}
             className={classes.root}>
                <Avatar className={classes.large} 
                alt={message.author} 
                // src={user.profileImage}
                />
    
                <Box className={classes.commentContainer}>
                    <Box onClick={handleSlide} style={{marginLeft:".4em",zIndex:3}}
                     className="bubble">
                        <Typography style={{fontSize:".8em"}} component="span" variant="body1">
                            {message.body}
                        </Typography>
                        <Typography component="span" variant="subtitle2" 
                            className={classes.dateContainer}>
                        {`${formatDistanceToNow((message.createdAt as any).toDate())} ago`}  
                        </Typography>
                    </Box>
                {/* {message.author === currentUser?.uid && 
                <Collapse
                timeout={600}
                style={{transform:"rotate(90deg)"}}
                collapsedHeight={40}
                    in={deleteSlide}>
                        <Box className={classes.actionContainer}>
                            <IconButton onClick={handleSlide}>
                                <IoIosArrowBack 
                                 style={{transform:!deleteSlide ? "rotate(90deg)": "rotate(630deg)",zIndex:105}} />
                            </IconButton>
                            <IconButton onClick={deleteMessage}>
                               <MdHighlightOff 
                                style={{backgroundColor:red[300],color:red[800],transform:!deleteSlide ? "rotate(90deg)": "rotate(630deg)"}} />
                            </IconButton>
                        </Box>
                    </Collapse> } */}
                </Box>
            </Box>
    )
}

export default Message