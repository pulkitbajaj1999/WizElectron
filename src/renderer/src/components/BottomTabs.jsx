import { Tabs, Tab, Box } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PaletteIcon from '@mui/icons-material/Palette'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function TopTabsWithIcons() {
  const { t } = useTranslation()
  const location = useLocation()

  const getTabValue = () => {
    if (location.pathname.startsWith('/controller/static')) return 'static'
    if (location.pathname.startsWith('/controller/dynamic')) return 'dynamic'
    if (location.pathname.startsWith('/controller/color')) return 'color'
    return false
  }

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 1,
        width: '100%'
      }}
    >
      <Tabs
        value={getTabValue()}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            bottom: 0,
            height: 3,
            backgroundColor: 'primary.main'
          }
        }}
        sx={{
          '.MuiTab-root': {
            // color: 'text.primary',
            opacity: 1,
            backgroundColor: '#E5F3FD !important',
            boxShadow: '1px solid',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              backgroundColor: 'rgba(0, 123, 255, 0.08)', // ✅ bluish background
              // color: 'text.primary',
              borderRadius: 1 // optional rounding
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 123, 255, 0.08)' // subtle hover
            },
            '&:focus': {
              backgroundColor: 'rgba(0, 123, 255, 0.08)' // subtle focus
            }
          }
        }}
      >
        <Tab
          icon={<LayersIcon />}
          label={t('controller.tabs.static')}
          value="static"
          component={NavLink}
          to="/controller/static"
          disableRipple
        />
        <Tab
          icon={<AutoAwesomeIcon />}
          label={t('controller.tabs.dynamic')}
          value="dynamic"
          component={NavLink}
          to="/controller/dynamic"
          disableRipple
        />
        <Tab
          icon={<PaletteIcon />}
          label={t('controller.tabs.color')}
          value="color"
          component={NavLink}
          to="/controller/color"
          disableRipple
        />
      </Tabs>
    </Box>
  )
}
