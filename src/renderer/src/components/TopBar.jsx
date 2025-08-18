import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { FaLightbulb } from 'react-icons/fa6'

import LightSwitch from '@components/LightSwitch'
import { useBulb } from '@context/BulbContext'

export default function TopBar() {
  const { t } = useTranslation()
  const { bulb, localBulbState, apiActions } = useBulb()
  let bulbName = bulb ? bulb.name : t('controller.defaultBulbName')
  return (
    <AppBar className="topbar__wrapper" position="static" color="primary">
      <Toolbar sx={{ px: 2, gap: 2 }}>
        <FaLightbulb size={32} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {bulbName}
        </Typography>
        <LightSwitch isOn={localBulbState?.state} onToggle={apiActions?.toggleBulb} />
      </Toolbar>
    </AppBar>
  )
}
