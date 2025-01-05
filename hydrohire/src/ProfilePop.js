import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, IconButton, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { motion } from 'framer-motion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProfilePop( { onClose } ) {

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen overflow-scroll"
        >
          <div>
            <div className="flex flex-row justify-between items-center bg-[#FFB165] p-10 rounded-t-lg">
                <h1 className="text-4xl font-bold">My Profile</h1>
                <HighlightOffIcon onClick={ onClose } sx={{ cursor: 'pointer' }}/>
            </div>
            <div className="flex flex-row justify-between bg-white pl-10 pr-10 rounded-b-lg gap-40">
              <div className="flex flex-col mt-10">
                <div className="flex flex-row gap-5 items-center">
                  <SettingsIcon />
                  <h3 className="text-3xl font-bold">Edit Profile</h3>
                </div>
                <h4 className="text-xl font-bold mt-4 mb-2">Email</h4>
                <TextField label="Email" type="email" variant="outlined" fullWidth name="email"/>
                <h4 className="text-xl font-bold mt-4 mb-2">Display Name</h4>
                <TextField label="Display Name" type="text" variant="outlined" fullWidth name="displayName"/>
                <Button 
                  variant="contained" 
                  type="submit" 
                  fullWidth
                  sx={{
                    fontSize: 20,
                    backgroundColor: (theme) => theme.palette.primary.main, 
                    color: 'white',  
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      color: (theme) => theme.palette.primary.white,  
                    },
                    marginTop: 4,
                    marginBottom: 4,
                    borderRadius: 2,
                  }}
                >
                SAVE
                </Button>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx ={{ color: 'white' }}/>}
                    aria-controls="panel-content"
                    id="panel-header"
                    sx = {{
                      color: 'white',
                      backgroundColor: (theme) => theme.palette.primary.dark,
                      borderRadius: 2,
                      marginBottom: 10,
                    }}
                  >
                    <Typography>Change Password</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{
                    width: '350px',
                  }}>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div>
                <div className="flex flex-row gap-5 mt-10 items-center">
                  <PaletteIcon />
                  <h3 className="text-3xl font-bold">Theme Color</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
    )
}

export default ProfilePop;