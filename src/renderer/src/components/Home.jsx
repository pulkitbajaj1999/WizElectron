import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Container,
  Box,
  Grid,
  IconButton,
  Slider,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material'

import {
  Lightbulb as LightbulbIcon,
  WbIncandescent as FocusIcon,
  Bedtime as RelaxIcon,
  LocalCafe as CoffeeIcon,
  SelfImprovement as MeditateIcon,
  EmojiPeople as PartyIcon,
  Nightlight as NightIcon,
  AcUnit as CoolIcon,
  WbSunny as WarmIcon,
  FlashOn as EnergizeIcon,
  Tv as MovieIcon,
  ExpandLess as DimIcon,
  ExpandMore as BrightIcon,
  Palette as ColorIcon,
  AutoAwesome as DynamicIcon,
  Layers as StaticIcon
} from '@mui/icons-material'

const scenes = [
  { label: 'Relax', icon: <RelaxIcon /> },
  { label: 'Focus', icon: <FocusIcon /> },
  { label: 'Coffee', icon: <CoffeeIcon /> },
  { label: 'Meditate', icon: <MeditateIcon /> },
  { label: 'Party', icon: <PartyIcon /> },
  { label: 'Night', icon: <NightIcon /> },
  { label: 'Cool', icon: <CoolIcon /> },
  { label: 'Warm', icon: <WarmIcon /> },
  { label: 'Energize', icon: <EnergizeIcon /> },
  { label: 'Movie', icon: <MovieIcon /> },
  { label: 'Reading', icon: <FocusIcon /> }
]

export default function WizController() {
  const [isOn, setIsOn] = useState(true)
  const [selectedScene, setSelectedScene] = useState('Relax')
  const [brightness, setBrightness] = useState(50)
  const [tab, setTab] = useState(0)

  const handleToggle = () => setIsOn(!isOn)
  const handleSceneClick = (label) => setSelectedScene(label)
  const handleBrightnessChange = (_, value) => setBrightness(value)

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <LightbulbIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Living Room Light
          </Typography>
          <Switch
            checked={isOn}
            onChange={handleToggle}
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

      {/* Main Content */}
      <Container
        className="main-container"
        sx={{ flexGrow: 1, py: 2, display: 'flex', flexDirection: 'column' }}
      >
        {/* Scene Grid */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {scenes.map(({ label, icon }) => (
              <Grid item xs={4} sm={3} md={2} key={label} textAlign="center">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <IconButton
                    color={selectedScene === label ? 'primary' : 'default'}
                    onClick={() => handleSceneClick(label)}
                    size="large" // <--- See next point
                  >
                    {icon}
                  </IconButton>
                  <Typography variant="body2" fontSize="0.7rem" sx={{ mt: 0.5 }}>
                    {label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Brightness Slider */}
        <Box className="brightness-slider" sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <DimIcon color="action" />
          <Slider
            value={brightness}
            onChange={handleBrightnessChange}
            min={0}
            max={100}
            sx={{ mx: 2, flex: 1 }}
            aria-label="Brightness"
          />
          <BrightIcon color="action" />
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <Paper elevation={3}>
        <BottomNavigation value={tab} onChange={(e, newValue) => setTab(newValue)} showLabels>
          <BottomNavigationAction label="Static" icon={<StaticIcon />} />
          <BottomNavigationAction label="Dynamic" icon={<DynamicIcon />} />
          <BottomNavigationAction label="Color" icon={<ColorIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
