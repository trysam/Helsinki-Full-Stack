import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const NoteForm = ({addNote, handleChange, input}) => {
  return (
   <Box m="40px 20px 20px 20px">
        <form onSubmit={addNote} >
            <Input value={input} onChange={handleChange} placeholder={"Write new note here"} variant="soft" fullWidth />
            <Button sx={{mt:"10px"}} type="submit" variant="contained" >Add Note</Button>
        </form>
    </Box>
  )
}

export default NoteForm