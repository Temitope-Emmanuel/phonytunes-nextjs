import React from 'react'

export interface TableOptions {
    input:{
        text:string;
        handleChangeText?:(e:React.SyntheticEvent<HTMLInputElement>) => void;
    },
    filter:{
        selectedFilter:number;
        anchorEl:null | HTMLElement;
        handleClick:(event: React.MouseEvent<HTMLElement>) => void;
        handleClose:() => void;
        setFilter:(event: React.MouseEvent<HTMLElement>, index: number) => void;
    }
}

const createGenericContext = <T extends unknown>() => {
    // Create a context with a generic parameter or undefined
    const genericContext = React.createContext<T | undefined>(undefined)
  
    // Check if the value provided to the context is defined or throw an error
    const useGenericContext = () => {
      const contextIsDefined = React.useContext(genericContext)
      if (!contextIsDefined) {
        throw new Error("useGenericContext must be used within a Provider")
      }
      return contextIsDefined
    }
  
    return [useGenericContext, genericContext.Provider] as const
  }

const [useTableService,TableServiceContextProvider] = createGenericContext<TableOptions>()


interface IProps {}

export const TableContextProvider:React.FC<IProps> = ({children}) => {
    const [input,setInput] = React.useState("")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleInputChange = (e:React.SyntheticEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <TableServiceContextProvider
            value={{
                filter:{
                    selectedFilter:selectedIndex,
                    setFilter:handleMenuItemClick,
                    handleClose,
                    handleClick:handleClickListItem,
                    anchorEl
                },
                input:{
                    text:input,
                    handleChangeText:handleInputChange
                }
            }}
        >
            {children}
        </TableServiceContextProvider>
    )
}

export default useTableService

export type tableServiceType = ReturnType<typeof useTableService>