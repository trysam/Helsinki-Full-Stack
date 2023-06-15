import Note from "./note"
import { Box } from "@mui/material"

const DisplayNotes = ({noteToDisplay, toggleImportance, deleteNote}) => {
  return (
    <Box 
      display="grid" 
      m="20px"
      gridTemplateColumns= "repeat(auto-fit, minmax(250px, 1fr))"
      gridAutoRows="200px"
      gap="20px"
    >         
      {noteToDisplay.map((note) => 
          <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportance(note.id)} 
              deleteNote={() => deleteNote(note.id)}
          /> 
      )}       
    </Box>
  )
}

export default DisplayNotes