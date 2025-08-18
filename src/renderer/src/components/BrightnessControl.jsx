import { useState } from 'react'
import { Box, Slider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MdBrightnessLow, MdBrightnessHigh } from 'react-icons/md'
import { useBulb } from '@context/BulbContext'

const StyledBrightnessSlider = styled(
  Slider,
  {}
)(() => ({
  mx: 2,
  flex: 1,
  height: 8, // height of the slider area
  '& .MuiSlider-thumb': {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    boxShadow: 1,
    // Remove fill on focus/hover
    // Small ripple on hover
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.14)'
    },

    // Remove ripple on focus to avoid overlap
    '&.Mui-focusVisible': {
      boxShadow: 'none'
    },

    // Large ripple on drag (active)
    '&.Mui-active': {
      boxShadow: '0 0 0 10px rgba(25, 118, 210, 0.14)'
    }
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 20
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    height: 20
  }
}))

export default function BrightnessControl() {
  let { bulb, localBulbState, apiActions } = useBulb()
  let initial_brightness = localBulbState?.brightness || 100
  const [sliderValue, setSliderValue] = useState(initial_brightness)
  const handleCommit = (e, value) => {
    apiActions.setBrightness(value)
  }
  // let [brightness, setBrightness] = useState(100)
  return (
    <Box
      className="brightness-control__wrapper"
      sx={{
        borderTop: '1px solid #ccc',
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        px: 2,
        py: 2, // padding top and bottom
        backgroundColor: 'wite', // light background (optional)
        boxShadow: 1 // subtle shadow
      }}
    >
      <MdBrightnessLow size={20} />
      <StyledBrightnessSlider
        className="brightness-control__slider"
        value={sliderValue}
        onChange={(e, value) => setSliderValue(Math.max(value, 10))}
        onChangeCommitted={handleCommit}
        min={0}
        max={100}
        aria-label="Brightness"
        disabled={!bulb}
      />
      <MdBrightnessHigh size={20} />
    </Box>
  )
}
