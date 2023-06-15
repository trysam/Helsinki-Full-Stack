import {Typography, Button, Box} from "@mui/material";
import styled from "@emotion/styled";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const MyButton = styled(Button)(() => ({
    fontSize:'0.5rem',
    
}))
const Note = ({note, toggleImportance, deleteNote}) => {
    const label = note.important? "make unimportant" : "make important";
    return  <Box 
                gridColumn="span 1" 
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                           
                sx={{
                    
                    background: `hsla(210, 79%, 46%, 1) 
                                linear-gradient(90deg, hsla(210, 79%, 46%, 1) 0%, hsla(187, 79%, 63%, 1) 100%);
                                -moz-linear-gradient(90deg, hsla(210, 79%, 46%, 1) 0%, hsla(187, 79%, 63%, 1) 100%)
                                -webkit-linear-gradient(90deg, hsla(210, 79%, 46%, 1) 0%, hsla(187, 79%, 63%, 1) 100%)`,
                    filter: "progid: DXImageTransform.Microsoft.gradient( startColorstr='#1976d2', endColorstr='#54d9eb', GradientType=1 )",
                }}
            >                             
                    <Typography gutterBottom variant="body1" display="flex" textAlign="center" justifyContent="center" alignItems="center" height="150%" p="30px 10px 10px 10px">
                        {note.content}
                    </Typography>                    
                <Box p="0 20px 20px 20px " display="flex" justifyContent="space-between">
                    <MyButton size="small" color="primary" variant="contained" endIcon={<SendIcon />} onClick={toggleImportance}>{label}</MyButton>
                    <MyButton size="small" color="secondary" variant="contained" startIcon={<DeleteIcon/>} onClick={deleteNote}>DeleteNote</MyButton>          
                </Box>
            </Box> 
}

export default Note;