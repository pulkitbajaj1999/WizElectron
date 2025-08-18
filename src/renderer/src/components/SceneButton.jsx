import { styled } from '@mui/material/styles'
import { Box, IconButton, Typography } from '@mui/material'

const StyledIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'selected' })(
  ({ theme, selected, color = '#f0f0f0', iconSize }) => ({
    width: iconSize * 2,
    height: iconSize * 2,
    borderRadius: '50%',
    background: `radial-gradient(
        circle,
        ${color}99,
        ${color}70,
        ${color}15,
        ${color}00
    )`,
    color: theme.palette.text.primary,
    // color: selected ? '#fff' : theme.palette.text.primary,
    border: selected ? `3px solid ${theme.palette.primary.dark}` : '',
    '&:hover': {
      backgroundColor: selected ? '' : '#e0e0e0'
    }
  })
)

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected'
})(({ selected }) => ({
  transition: 'transform 0.3s ease',
  transform: selected ? 'scale(1.2)' : 'scale(1)', // scale only icon
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}))

export default function SceneButton({
  icon: Icon,
  size,
  color,
  label,
  selected,
  onClick,
  disabled
}) {
  return (
    <Box selected={selected} display="flex" flexDirection="column" alignItems="center">
      <StyledIconButton
        size="large"
        disabled={disabled}
        iconSize={size}
        onClick={onClick}
        color={color}
        selected={selected}
        disableRipple
      >
        <IconWrapper selected={selected}>
          <Icon size={size} />
        </IconWrapper>
      </StyledIconButton>
      <Typography variant="body2" fontSize="0.9rem" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  )
}
