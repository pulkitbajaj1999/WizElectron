import { useTranslation } from 'react-i18next'
import { Box, Container, Typography, Divider, Paper } from '@mui/material'
import { FaLightbulb } from 'react-icons/fa6'

import ViewToggleSwitch from '@components/ViewToggleSwitch'
import { useBulb } from '@context/BulbContext'

export default function DeviceInfo() {
  const { bulb, formatDeviceInfo, setFormatDeviceInfo } = useBulb()

  const { t } = useTranslation()
  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100%',
        flexGrow: 1,
        pt: 4,
        pl: 4,
        display: 'flex',
        flexDirection: 'column'
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
        {t('deviceInfo.pageTitle')}
      </Typography>
      <Divider sx={{ borderColor: 'blue', mb: 2 }} />
      <ViewToggleSwitch
        isChecked={formatDeviceInfo}
        checkedLabel={t('deviceInfo.raw')}
        uncheckedLabel={t('deviceInfo.formatted')}
        onToggle={setFormatDeviceInfo}
      />
      {formatDeviceInfo && (
        <Paper
          elevation={12}
          sx={{
            bgcolor: 'primary.main',
            opacity: 0.9,
            borderRadius: 3,
            p: 4,
            color: 'common.white',
            marginX: 'auto',
            border: '2px solid',
            borderColor: 'primary.dark',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <FaLightbulb size={64} />
          </Box>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.moduleName')}: </strong>
            {bulb?.moduleName}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.ipAddress')}: </strong>
            {bulb?.ip}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.port')}: </strong>
            {bulb?.port}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.macAddress')}: </strong>
            {bulb?.mac}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.status')}: </strong>
            {bulb?.state ? 'ON' : 'OFF'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.sceneId')}: </strong>
            {bulb?.sceneId}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.brightness')}: </strong>
            {`${bulb?.dimming}%`}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.temperature')}: </strong>
            {`${bulb?.temp} Kelvin`}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.firmwareVersion')}: </strong>
            {bulb?.fwVersion}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.homeId')}: </strong>
            {bulb?.homeId}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>{t('deviceInfo.modal.roomId')}: </strong>
            {bulb?.roomId}
          </Typography>
        </Paper>
      )}
      {!formatDeviceInfo && (
        <Paper
          elevation={3}
          sx={{
            height: '100%',
            flex: 1,
            padding: 2,
            mb: 2,
            backgroundColor: '#f6f8fa',
            overflow: 'auto',
            flexDirection: 'column'
          }}
        >
          <Box
            component="pre"
            sx={{
              flex: 1,
              margin: 0,
              fontFamily: 'Consolas, Menlo, monospace',
              fontSize: '0.875rem',
              whiteSpace: 'pre',
              color: '#24292e'
            }}
          >
            {JSON.stringify(bulb, null, 2)}
          </Box>
        </Paper>
      )}
    </Container>
  )
}
