import _ from 'lodash'
import { Container, Box, Grid, Typography } from '@mui/material'

import SceneButton from '@components/SceneButton'

// react-icons library
import { FaSpa, FaLightbulb, FaSun, FaSnowflake, FaTv } from 'react-icons/fa6'

import { FaRegMoon } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'

// import { GiMeditation } from 'react-icons/gi'

import { BsPalette } from 'react-icons/bs'
import { RiPlantLine } from 'react-icons/ri'
import { FiCoffee } from 'react-icons/fi'
import { useBulb } from '@context/BulbContext'

const scenes = [
  { label: 'night light', icon: FaRegMoon, color: '#b5bdbd' },
  { label: 'cozy', icon: FiCoffee, color: '#cad40b' },
  { label: 'true colors', icon: BsPalette, color: '#eef51b' },
  { label: 'relax', icon: FaSpa, color: '#db0bd1' },
  { label: 'focus', icon: FaBookReader, color: '#82fae6' },
  { label: 'tv Time', icon: FaTv, color: '#1c0bdb' },
  { label: 'plantgrowth', icon: RiPlantLine, color: '#d408a8' }
]

const basicScenes = [
  // { label: 'white', icon: FaFire },
  { label: 'warm white', icon: FaLightbulb },
  { label: 'daylight', icon: FaSun },
  { label: 'cool white', icon: FaSnowflake }
]

const DEFAULT_ICON_SIZE = 40

const HeadingTypograhy = ({ label }) => {
  return (
    <Typography
      variant="h" // heading style, customize as needed
      component="span" // or "div", "p", etc.
      sx={{
        pb: 2,
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
  let { bulb, localBulbState, apiActions } = useBulb()
  const scene = localBulbState?.scene
  const checkSelected = (label) => {
    return String(label).toLowerCase() === String(scene).toLowerCase()
  }

  return (
    <Container
      className="static-scenes__container"
      sx={{ py: 2, display: 'flex', flex: 1, flexDirection: 'column', minHeight: '100%', gap: 8 }}
    >
      {/* basic scenes */}
      <Box className="static-scene__basic" sx={{ flexGrow: 0 }}>
        <HeadingTypograhy label={'Basic'} />
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
          {basicScenes.map(({ label, icon, size, color }) => (
            <Grid item xs={12} sm={3} md={2} key={label} textAlign="center">
              <SceneButton
                disabled={!bulb}
                icon={icon}
                size={size || DEFAULT_ICON_SIZE}
                color={color}
                label={_.startCase(label)}
                selected={checkSelected(label)}
                onClick={() => apiActions.setScene(label)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Functional scenes */}
      <Box sx={{ flexGrow: 1 }}>
        <HeadingTypograhy label="Functional" />
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
          {scenes.map(({ label, icon, size, color }) => (
            <Grid item xs={12} sm={6} md={3} key={label} textAlign="center">
              <SceneButton
                disabled={!bulb}
                icon={icon}
                size={size || DEFAULT_ICON_SIZE}
                color={color}
                label={_.startCase(label)}
                selected={checkSelected(label)}
                onClick={() => apiActions.setScene(label)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <StaticScenes /> */}
    </Container>
  )
}
