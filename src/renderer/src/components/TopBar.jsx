import React from 'react'
import { AppBar, Toolbar, Typography, Switch } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

export default function TopBar({ isOn, onToggle }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <LightbulbIcon sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Living Room Light
        </Typography>
        <Switch
          checked={isOn}
          onChange={onToggle}
          inputProps={{ 'aria-label': 'light toggle' }}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#fff176'
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#fff176'
            }
          }}
        />
      </Toolbar>
    </AppBar>
  )
}
