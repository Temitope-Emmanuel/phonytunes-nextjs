import React from "react"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import {Box,Typography} from "@material-ui/core"
import {deepOrange} from "@material-ui/core/colors"
import useCollection from "../src/utils/useCollection"
import {formatDistanceToNow} from "date-fns"

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        root:{
            marginTop:"1.5em",
            paddingTop:"3em",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            width:"100vw",
        },
        blogContainer:{
            width:"95%",
            borderRadius:".3em",
            margin:"1em .5em",
            display:"grid",
            gridTemplateColumns:"repeat( auto-fit, minmax(23em, 1fr))",
            gridTemplateRows:"fit-content(12em)",
            gridGap:".5em"
        },
        bodyContainer:{
            backgroundColor:"rgba(0,0,0,0.1)",
            margin:'.5em',
            padding:".5em 1em",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            borderRadius:".3em",
            "& > div:first-child":{
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"flex-start",
                flexDirection:"column",
                width:"75%",
                " & span":{
                    alignSelf:"flex-start"
                }
            },
        },
        imageContainer:{
            width:"25%",
            borderRadius:".3em",
            height:"6em",
            backgroundColor:deepOrange[500]
        }
    })
))

interface IBlog {
    title:string;
    body:string;
    createdAt:string;
}


const BlogPage = () => {
    const classes = useStyles()
    const {documentsInCollection:blogs,loadCollection:loadBlogs} = useCollection({
        collectionName:"blogs"
    })
    
    React.useEffect(() => {
        loadBlogs()
    },[])

    console.log(blogs)

    return(
        <Box className={classes.root}>
            <Typography variant="h6">
                PHONYTUNES BLOG
            </Typography>
            <Box className={classes.blogContainer}>
                {blogs.map((blog,idx) =>(
                    <Box key={idx} className={classes.bodyContainer} >
                        <Box>
                            <Typography style={{alignSelf:'"flex-start'}}
                             variant="h5">
                                {blog.title}
                            </Typography>
                            <Typography variant="body1" >
                                {blog.content.substring(0,150)}...
                            </Typography>
                            <Typography style={{alignSelf:'"flex-start'}} variant="caption" >{formatDistanceToNow(blog.createdAt.toDate())} ago </Typography>
                        </Box>
                        <Box className={classes.imageContainer}></Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default BlogPage