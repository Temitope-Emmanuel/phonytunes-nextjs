import {useState} from "react"


const useInputState = (initialState:any) => {
    const [state,setState] = useState(initialState)
    const changeState = (e:any) => {setState(e.target.value)}
    const resetState = () => {setState(initialState)}
    

    return [state,changeState,resetState]
}

export default useInputState