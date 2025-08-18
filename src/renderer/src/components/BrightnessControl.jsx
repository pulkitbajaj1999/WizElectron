import { Box, Slider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MdBrightnessLow, MdBrightnessHigh } from 'react-icons/md'

const StyledBrightnessSlider = styled(
  Slider,
  {}
)(({ theme }) => ({
  mx: 2,
  flex: 1,
  height: 8, // height of the slider area
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    boxShadow: 1
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 8
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    height: 8
  }
}))
export default function BrightnessControl({ brightness, onChange }) {
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
        backgroundColor: '#f5f5f5', // light background (optional)
        boxShadow: 1 // subtle shadow
      }}
    >
      <MdBrightnessLow size={20} />
      <StyledBrightnessSlider
        value={brightness}
        onChange={onChange}
        min={0}
        max={100}
        aria-label="Brightness"
      />
      <MdBrightnessHigh size={20} />
    </Box>
  )
}
