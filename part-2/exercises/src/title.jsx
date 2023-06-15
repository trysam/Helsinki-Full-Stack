import {Typography, Box} from '@mui/material'

const Title = ({view, toggleTitle}) => {
  return (
    <div>
       <Box align='center' sx={{marginTop:"20px"}} >
            <Typography variant='h3' color='textPrimary' >
                {view? "All" : "Important"} Notes
            </Typography> 
            <Typography variant='h6' color='textSecondary' paragraph>
                Capture your thoughts in a note and assign them the importance they deserve
            </Typography>                 
       </Box>
                 
        
        
    </div>
  )
}

export default Title