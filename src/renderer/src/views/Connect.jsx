import IpModal from '@components/IpModal'
import LightSwitch from '@components/LightSwitch'
import { useBulb } from '@context/BulbContext'
import { Box, Button, Container, Typography, CircularProgress, Divider } from '@mui/material'
import { FaLightbulb } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

export default function Connect() {
  const { bulb, apiActions } = useBulb()
  const { t } = useTranslation()

  const BulbElement = () => (
    <Box
      className="bulb-element__wrapper"
      display="flex"
      p={2}
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      bgcolor="primary.main"
      color="white"
      borderRadius={2}
      border={2}
      borderColor="primary.main"
      width="100%"
    >
      <FaLightbulb size={35} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1} // <-- ensures this box grows to fill space
        gap={2}
      >
        <Typography fontWeight="bold" noWrap>
          {bulb.name || bulb.moduleName}
        </Typography>
        <LightSwitch isOn={bulb?.state} onToggle={apiActions?.toggleBulb} />
      </Box>
    </Box>
  )

  const SearchingBulbElement = () => (
    <Box className="searching-bulb__wrapper">
      <Box
        display="flex"
        p={2}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        bgcolor="primary.main"
        color="white"
        borderRadius={2}
        border={2}
        borderColor="primary.main"
        minWidth={300}
        width="100%"
        flexGrow="1"
      >
        <FaLightbulb size={35} />
        <Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <Typography sx={{ fontWeight: 'bold' }}>{t('searchingBulb.search')}</Typography>
          <CircularProgress size={24} color="inherit" />
        </Box>
      </Box>

      <Box
        mt={2}
        ml={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        color="black"
        fontWeight="bold"
        fontSize="0.8rem"
      >
        <Typography>{t('searchingBulb.notFound')}</Typography>
        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            padding: 0,
            margin: 0,

            textDecoration: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            },
            '&:active, &:focus': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
          disableRipple
        >
          {t('searchingBulb.manual')}
        </Button>
      </Box>
    </Box>
  )

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        pt: 4,
        pl: 4,
        bgcolor: 'background.default',
        minHeight: '100%',
        width: '100%'
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          letterSpacing: 2,
          textTransform: 'uppercase',
          mb: 0,
          textAlign: 'center'
        }}
      >
        {t('connect.pageTitle')}
      </Typography>
      <Divider sx={{ borderColor: 'blue', mb: 4 }} />
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          marginX: 'auto',
          gap: 4
        }}
      >
        {bulb && <BulbElement />}
        {!bulb && <SearchingBulbElement />}
        <IpModal />
      </Box>
    </Container>
  )
}
