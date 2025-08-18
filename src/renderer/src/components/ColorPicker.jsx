import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import { RiAddBoxLine } from 'react-icons/ri'

import IroColorPicker from '@components/IroColorPicker'
import ColorSwatchGrid from '@components/ColorSwatchGrid'

export default function ColorPicker({ color, setColor }) {
  // const DEFAULT_COLOR_HEX = '#aa00aa'
  // const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR_HEX)
  const [userInput, setUserInput] = useState(color ? color.replace('#', '') : '')

  const handleInputChange = (e) => {
    const input = e.target.value
    const filteredInput = input.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)

    setUserInput(filteredInput)
    if (filteredInput.length === 6) {
      const hexValue = `#${filteredInput}`
      setColor(hexValue)
    }
  }

  const onColorPick = (color) => {
    setColor(color.hexString)
    setUserInput(color.hexString.replace('#', ''))
  }

  return (
    <Box
      className="color-picker__wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <Box
        className="color-picker__selector"
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5
        }}
      >
        <IroColorPicker hex={color} onColorPick={onColorPick} lazy={true} />
        <ColorSwatchGrid />
      </Box>
      <Box
        className="color-picker__hexeditor"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          width: '100%'
        }}
      >
        <TextField
          label="Hex Code"
          value={userInput} // Remove # from value to avoid duplication
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          sx={{ width: 150 }}
          InputProps={{
            startAdornment: (
              <Typography
                component="span"
                sx={{ mr: 0.5, display: 'flex', alignItems: 'center', color: '#cecece' }}
              >
                #
              </Typography>
            )
          }}
        />
        <IconButton
          // color={isFavorite ? 'error' : 'default'}
          onClick={() => {}}
          aria-label="add to favorites"
        >
          <RiAddBoxLine size={30} />
        </IconButton>
      </Box>
    </Box>
  )
}
