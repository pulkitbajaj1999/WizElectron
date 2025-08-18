import React from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PaletteIcon from '@mui/icons-material/Palette'

export default function BottomTabs({ value, onChange }) {
  return (
    <Paper elevation={3}>
      <BottomNavigation value={value} onChange={onChange} showLabels>
        <BottomNavigationAction label="Static" icon={<LayersIcon />} />
        <BottomNavigationAction label="Dynamic" icon={<AutoAwesomeIcon />} />
        <BottomNavigationAction label="Color" icon={<PaletteIcon />} />
      </BottomNavigation>
    </Paper>
  )
}
