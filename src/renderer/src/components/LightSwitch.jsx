import { Switch } from '@mui/material'

export default function LightSwitch({ isOn, onToggle }) {
  return (
    <Switch
      checked={isOn}
      onChange={onToggle}
      size="medium"
      inputProps={{ 'aria-label': 'light toggle' }}
      sx={{
        width: 64,
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#fff176'
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#fff176'
        },
        '& .MuiSwitch-thumb': {
          width: 28,
          height: 28
        },
        '& .MuiSwitch-track': {
          borderRadius: 20,
          backgroundColor: '#ccc',
          height: 22,
          opacity: 1
        }
      }}
    />
  )
}
