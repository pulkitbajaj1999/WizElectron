import { Box, Typography, Button, Container, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}
    >
      <Box width="100%" textAlign="center">
        <Stack spacing={3} alignItems="center">
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} />
          <Typography variant="h5" fontWeight="bold">
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary">
          We couldn&#39;t load the page you&#39;re looking for. Please try again or return to the home
          screen.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 1 }}>
            Go Home
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default NotFound
