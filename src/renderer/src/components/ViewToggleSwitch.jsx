import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Switch } from '@mui/material'

// 🔧 Custom large switch with custom color
const StyledSwitch = styled(Switch)(() => ({
  width: 100,
  height: 50,
  padding: 10,
  '& .MuiSwitch-switchBase': {
    padding: 12,
    '&.Mui-checked': {
      transform: 'translateX(50px)', // move thumb to right
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1976D2', // checked track color
        opacity: 1
      }
    }
  },
  '& .MuiSwitch-thumb': {
    width: 26,
    height: 26
  },
  '& .MuiSwitch-track': {
    borderRadius: 25,
    backgroundColor: '#1976D2' // unchecked track color
    // opacity: 0.38 // default
  }
}))

export default function ViewToggleSwitch({ isChecked, onToggle, checkedLabel, uncheckedLabel }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      {/* List View Label */}
      <Typography variant="h6" color={!isChecked ? 'primary' : 'textSecondary'}>
        {checkedLabel}
      </Typography>

      {/* Switch Component */}
      <StyledSwitch
        checked={isChecked}
        onChange={(event, value) => onToggle(value)}
        inputProps={{ 'aria-label': 'Toggle view' }}
      />

      {/* Grid View Label */}
      <Typography variant="h6" color={isChecked ? 'primary' : 'textSecondary'}>
        {uncheckedLabel}
      </Typography>
    </Box>
  )
}
