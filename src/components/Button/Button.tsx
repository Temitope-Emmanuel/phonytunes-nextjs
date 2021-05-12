import React from "react"
import {ButtonProps} from "@material-ui/core/Button"
import {IBaseModel} from "core/models/BaseModel"
import {orange} from "@material-ui/core/colors"

interface IProps extends IBaseModel,ButtonProps {
    style?:any;
}



const Button:React.FC<IProps> = ({children,className,style,...props}) => {
    return(
        <button className={`
        flex items-center justify-center px-4 py-1 border 
        border-transparent text-base font-medium rounded-md
      bg-brand-dark
        md:py-2 md:text-lg md:px-5 ${className}`}
         style={style ? style : undefined} {...props}>
            {children}
        </button>
    )
}

export default Button