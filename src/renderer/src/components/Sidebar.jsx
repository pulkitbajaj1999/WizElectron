import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Toolbar
} from '@mui/material'
import { Link, useMatch } from 'react-router-dom'
import { FaCircleQuestion, FaLightbulb, FaGear } from 'react-icons/fa6'
import {  MdMenu } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { useState, memo } from 'react'
import wizLogoSvg from '@assets/wiz-logo.svg'

const expandedWidth = 150
const collapsedWidth = 64
const DEFAULT_ICON_SIZE = 25

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [version, setVersion] = useState(() => sessionStorage.getItem('version') || '1.0.0')
  const { t } = useTranslation()

  const toggleCollapse = () => setIsCollapsed((prev) => !prev)

  const visitAuthorHandler = () => window.api.visitAuthor()

  const navItems = [
    { label: t('menu.connect'), icon: FaLightbulb, path: '/connect' },
    { label: t('menu.controller'), icon: FaGear, path: '/controller' },
    { label: t('menu.deviceInfo'), icon: FaCircleQuestion, path: '/device-info' }
  ]

  const RenderNavItem = ({ label, icon: Icon, size, color, path }) => {
    const isActive = !!useMatch({ path: path, end: false })
    return (
      <ListItem key={path} disablePadding sx={{ display: 'block' }}>
        <Tooltip title={isCollapsed ? label : ''} placement="right">
          <ListItemButton
            component={Link}
            to={path}
            selected={isActive}
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? 'center' : 'initial',
              px: 2,
              mx: 0.5,
              color: 'blue',
              '&.Mui-selected': {
                backgroundColor: 'rgba(0,0,255,0.2)',
                borderRadius: 2
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: 'center',
                color: 'blue'
              }}
            >
              <Icon size={size || DEFAULT_ICON_SIZE} color={color || null} />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={label} sx={{ color: 'black' }} />}
          </ListItemButton>
        </Tooltip>
      </ListItem>
    )
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isCollapsed ? collapsedWidth : expandedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: isCollapsed ? collapsedWidth : expandedWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          color: 'white'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo + Toggle Button */}
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            px: isCollapsed ? 1 : 2,
            borderBottom: '1px solid #ccc',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            gap: 1
          }}
        >
          <IconButton onClick={toggleCollapse} size="small">
            <MdMenu />
          </IconButton>
          {!isCollapsed && <img src={wizLogoSvg} alt="Wiz logo" width={80} height={40} />}
        </Toolbar>

        {/* Navigation */}
        <Box className="navigation-list__wrapper" flexGrow={1}>
          <List>{navItems.map(RenderNavItem)}</List>
        </Box>

        <Divider sx={{ mt: 2 }} />

        {/* Footer Info */}
        {!isCollapsed && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <Typography
              variant={'caption'}
              onClick={visitAuthorHandler}
              sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'grey' }}
            >
              github
            </Typography>
            <Typography variant="caption" color="gray" display="block" mt={0.5}>
              Version: <strong>{version}</strong>
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

export default memo(Sidebar)
