import React from "react"
import { Box, Avatar, Typography } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ChatMessage } from "core/models/ChatMessage"
import TouchRipple from "@material-ui/core/ButtonBase"
import {orange} from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: "flex",
        margin: theme.spacing(1.5, 0)
    },
    avatarContainer: {
        position: "relative",
        marginTop: theme.spacing(3),
        zIndex: 5,
        width:"1.5rem",
        height:"1.5rem",
        [theme.breakpoints.up("md")]:{
            width:"2rem",
            height:"2rem"
        }
    },
    fromMeContainer: {
        marginLeft: theme.spacing(1.5),
    },
    fromThemContainer: {
        marginRight: theme.spacing(1.5),
    },
    messageContainer: {
        display: "flex",
        flexDirection: "column",
        "& p": {
            maxWidth: "255px",
            wordWrap: "break-word",
            marginBottom: "12px",
            lineHeight: "18px",
            position: "relative",
            padding: "5px 12.5px",
            borderRadius: "25px",
            fontSize:".75rem",
            [theme.breakpoints.up("md")]:{
                fontSize:"1rem"
            }
        },
        "&  p::before,& p::after": {
            content: "' '",
            position: "absolute",
            bottom: 0,
            height: "20px"
        },
        "& span": {
            fontSize: ".5rem",
            [theme.breakpoints.up("md")]:{
                fontSize: ".7rem"
            }
        }
    },
    fromMe: {
        color: "white",
        backgroundColor: "#0B93F6",
        alignSelf: "flex-end",
        "&::before": {
            right: "-7px",
            width: "20px",
            backgroundColor: "#0B93F6",
            borderBottomLeftRadius: "16px 14px"
        },
        "&::after": {
            right: "-26px",
            width: "26px",
            backgroundColor: "#F9F5F9",
            borderBottomLeftRadius: "10px"
        }
    },
    fromThem: {
        background: "#0B93F6",
        color: "white",
        alignSelf: "flex-start",
        "&::before": {
            left: "-7px",
            width: "20px",
            backgroundColor: "#0B93F6",
            borderBottomRightRadius: "16px"
        },
        "&::after": {
            left: "-25px",
            width: "26px",
            backgroundColor: "#F9F5F9",
            borderBottomRightRadius: "10px"
        }
    },
    transactionContainer:{
        margin:".75rem auto",
        "& > div":{
            color:orange[300]
        }
    }
}))



interface IProps {
    chat: ChatMessage;
    style:object
}


const Message: React.FC<IProps> = ({
    style,
    chat: { id, author, createdAt, message, transaction, ownerIsCurrentUser }
}) => {
    const classes = useStyles()
    const justifySelf = { justifyContent: ownerIsCurrentUser ? "flex-end" : "flex-start",...(ownerIsCurrentUser && {paddingRight:".5rem"}) }
    const alignSelf = { alignSelf: ownerIsCurrentUser ? "flex-end" : "flex-start" }

    return (
        <Box className={`${classes.root}`} style={{...justifySelf,...style}}>
            {
                transaction ?
                <Link href={`/transaction/${id}`}>
                    <TouchRipple className={classes.transactionContainer}>
                        <Box className="self-center shadow-md rounded-3xl p-2 ">
                            <p className="text-xs md:text-base">
                                A transaction has been created
                            </p>
                        </Box> 
                    </TouchRipple>
                </Link>
                 :
                 <>
                    {!ownerIsCurrentUser && <Avatar className={`${classes.avatarContainer} ${classes.fromThemContainer}`} src={author.photoURL} />}
                    <Box className={classes.messageContainer}>
                        <Typography className={ownerIsCurrentUser ? classes.fromMe : classes.fromThem}>
                            {message}
                        </Typography>
                        <Typography component="span" style={alignSelf}>
                            {createdAt && `${formatDistanceToNow((createdAt as any).toDate())} ago`}
                        </Typography>
                    </Box>
                    {ownerIsCurrentUser && <Avatar className={`${classes.avatarContainer} ${classes.fromMeContainer}`} src={author.photoURL} />}
                </>
            }
        </Box>
    )
}

export default Message