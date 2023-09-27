import { createTheme } from "@mui/material";
import {red} from "@mui/material/colors";


const theme = createTheme({
    palette:{
        secondary:{
            main:red[400]
        }
    },

    components:{
        MuiButton:{
            styleOverrides:{
              containedSecondary:{
                borderRadius: 20
              }
                 
            }
        }
    }
})

export default theme 