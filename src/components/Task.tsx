import { Box, IconButton } from "@mui/material"
import { taskModel } from "../Utils/Models"

export type taskProps={
    index:number,
    task:taskModel

}

export default function Task({index,task}:taskProps){
    return(
        <Box
        borderRadius={5}
        position={"relative"}
        boxShadow={'xl'}
        bgcolor={task.color}>
            <IconButton
            >

            </IconButton>
            
        </Box>
    )

}