import React from "react"
import {Avatar,Typography,Box} from "@material-ui/core"
import {Skeleton} from "@material-ui/lab"


interface IDetailProps {
    image?:string;
    title:string;
    smallText?:string;
    subtitle?:string;
    timing?:string
    body?:string;
    isLoaded?:boolean
}


const DetailCard:React.FC<IDetailProps> = ({image,isLoaded=true,title,children,timing,smallText,subtitle,body}) => (
    <Skeleton  className="max-w-md" >
    <Box className="flex flex-col space-y-4 max-w-md">
            <Box className="flex items-center w-full">
                {
                    image &&
                    <Avatar
                    //  name="Temitope Emmanuel"
                        src={image} />
                }
                <Box className="flex items-start mr-auto w-full">
                    <Typography className="font-medium" >
                        {title}
                    </Typography>
                    {smallText &&
                        <Typography className="opacity-75">
                            {smallText}
                        </Typography>
                    }
                </Box>
                {timing &&
                    <Typography className="opacity-75">
                        {timing}
                    </Typography>
                }
            </Box>
            <Box className="flex items-start">
                {subtitle &&
                <Typography>
                    {subtitle}
                </Typography>
            }
                <Typography>
                    {body}
                </Typography>
            </Box>
            {children}
        </Box>
    </Skeleton>
)


export default DetailCard