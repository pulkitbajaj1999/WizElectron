import { Box, Grid } from '@mui/material'

// Array of swatch colors
const swatchColors = [
  '#a0563d',
  '#5f5850',
  '#c3c3c6',
  '#edf1ff',
  '#da3855',
  '#eda541',
  '#f5ea5a',
  '#75b85b',
  '#66a5d7',
  '#817799',
  '#e17ea5',
  '#f4cdaf'
]

function ColorSwatchGrid({ onColorSelect, selectedColor, direction = 'column' }) {
  return (
    <Box>
      <Grid container direction={direction} spacing={1} sx={{ marginX: 2, maxHeight: '300px' }}>
        {swatchColors.map((color) => (
          <Grid item xs={3} xm={12} key={color}>
            <Box
              onClick={() => onColorSelect(color)}
              sx={{
                backgroundColor: color,
                width: 40,
                height: 40,
                borderRadius: '4px',
                border: color === selectedColor ? '2px solid black' : '1px solid #ccc',
                cursor: 'pointer'
              }}
              title={color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ColorSwatchGrid
