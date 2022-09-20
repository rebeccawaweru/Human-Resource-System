import {ListItem,ListItemButton,ListItemIcon,Typography,Box, IconButton} from "@mui/material"
export default function CustomListItem({icon,title,onclick}){
    return(
        <Box onClick={onclick} sx={{display:"flex"}}>
        <IconButton >
        <b>{icon}</b>
        </IconButton>
        <Box sx={{display:{
            lg:"block",
            md:"block",
            xs:"none",
            sm:"none"
        }}}>
        <p><b>{title}</b></p>
        </Box>

        </Box>
    )
}