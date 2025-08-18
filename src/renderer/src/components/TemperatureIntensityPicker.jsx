import { useState } from 'react'
import { Slider, Box, Typography } from '@mui/material'

function ColorTemperaturePicker({ temp, setTemperature, disabled }) {
  const [sliderValue, setSliderValue] = useState(temp)

  const handleCommit = (e, value) => {
    setTemperature(value)
  }

  // const color = kelvinToRGB(kelvin)

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Slider
        value={sliderValue}
        min={2200}
        max={6500}
        step={100}
        onChange={(e, value) => setSliderValue(value)}
        onChangeCommitted={handleCommit}
        valueLabelDisplay="auto"
        disabled={disabled}
        sx={{
          height: 40,
          maxWidth: 500,
          padding: 0,
          '& .MuiSlider-rail': {
            display: 'none', // ❌ hide the rail
            border: 0
          },
          '& .MuiSlider-track': {
            background: 'none', // ❌ hide default track
            border: 0
          },
          '& .MuiSlider-thumb': {
            width: 30,
            height: 30,
            backgroundColor: '#fff',
            zIndex: 1
          },
          background: `linear-gradient(
            to right, 
            #ffe5b4 0%, 
            #fffbea 33%, 
            #ffffff 50%, 
            #e6f7ff 75%, 
            #d0f0ff 100%
          )`,
          borderRadius: 4
        }}
      />

      <Typography gutterBottom>Color Temperature ~{temp}K</Typography>
    </Box>
  )
}

export default ColorTemperaturePicker
