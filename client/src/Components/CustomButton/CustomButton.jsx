import {Box,Button} from '@mui/material'
export default function CustomButton({title,onClick}){
    return(
        <Button color='inherit' onClick={onClick}>{title}</Button>
    )
}