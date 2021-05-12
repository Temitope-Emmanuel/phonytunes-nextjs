import React,{useState} from "react"


const useInputState = (initialState:any) => {
    const [state,setState] = useState(initialState)
    const changeState = (e:any) => {setState(e.target.value)}
    const resetState = () => {setState(initialState)}
    

    return [state,changeState,resetState]
}

export const useImageTransformation = (initialState = {
    base64: "",
    name: "",
    file: null
}) => {
    const [image, setImage] = React.useState(initialState)

    const handleImageTransformation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        const { name } = e.currentTarget
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                setImage({
                    base64: (reader.result as string),
                    name: file.name,
                    file: file as any
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageReset = () => {
        setImage({...initialState})
    }

    return {
        image,
        handleImageTransformation,
        handleImageReset
    }

}

export default useInputState