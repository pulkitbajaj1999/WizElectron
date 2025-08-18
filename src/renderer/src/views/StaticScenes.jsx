import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Container, Box, Grid, Typography } from '@mui/material'

import SceneButton from '@components/SceneButton'

import BrightnessControl from '@components/BrightnessControl'

// react-icons library
import {
  FaSpa,
  FaBullseye,
  FaMoon,
  FaBolt,
  FaFilm,
  FaFire,
  FaLightbulb,
  FaSun,
  FaSnowflake,
  FaMugHot,
  FaTv
} from 'react-icons/fa6'

import { FaGlassCheers, FaRegMoon } from 'react-icons/fa'

import { GiMeditation } from 'react-icons/gi'

import { FcReading } from 'react-icons/fc'
import { BsPalette } from 'react-icons/bs'
import { RiPlantLine } from 'react-icons/ri'
import { FiCoffee } from 'react-icons/fi'

const scenes = [
  { label: 'Night', icon: FaRegMoon, color: '#b5bdbd' },
  { label: 'Cozy', icon: FiCoffee, color: '#cad40b' },
  { label: 'True Colors', icon: BsPalette, color: '#eef51b' },
  { label: 'Relax', icon: FaSpa, color: '#db0bd1' },
  { label: 'Focus', icon: FcReading },
  { label: 'Tv', icon: FaTv, color: '#1c0bdb' },
  { label: 'Plant Growth', icon: RiPlantLine, color: '#d408a8' }
]

const basicScenes = [
  { label: 'Warmest', icon: FaFire },
  { label: 'Warm', icon: FaLightbulb },
  { label: 'Daylight', icon: FaSun },
  { label: 'Cool', icon: FaSnowflake }
]

const DEFAULT_ICON_SIZE = 40

const SceneTypography = ({ label }) => {
  return (
    <Typography
      variant="h6" // heading style, customize as needed
      component="span" // or "div", "p", etc.
      sx={{
        width: '100%',
        display: 'block',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'text.primary',
        letterSpacing: '0.05em',
        userSelect: 'none' // optional
      }}
    >
      {label}
    </Typography>
  )
}

export default function StaticScenes() {
  const [selectedScene, setSelectedScene] = useState('Relax')

  const [brightness, setBrightness] = useState(100)

  return (
    <Container
      className="static-scenes__container"
      sx={{ py: 2, display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}
    >
      {/* basic scenes */}
      <Box className="static-scene__basic" sx={{ flexGrow: 1 }}>
        <SceneTypography label={'Basic'} />
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
          {basicScenes.map(({ label, icon, size, color }) => (
            <Grid item xs={12} sm={3} md={2} key={label} textAlign="center">
              <SceneButton
                icon={icon}
                size={size || DEFAULT_ICON_SIZE}
                color={color}
                label={label}
                selected={selectedScene === label}
                onClick={() => setSelectedScene(label)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Functional scenes */}
      <Box sx={{ flexGrow: 1 }}>
        <SceneTypography label="Functional" />
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
          {scenes.map(({ label, icon, size, color }) => (
            <Grid item xs={12} sm={6} md={3} key={label} textAlign="center">
              <SceneButton
                icon={icon}
                size={size || DEFAULT_ICON_SIZE}
                color={color}
                label={label}
                selected={selectedScene === label}
                onClick={() => setSelectedScene(label)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <StaticScenes /> */}
    </Container>
  )
}
