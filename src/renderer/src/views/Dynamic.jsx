import { useBulb } from '@context/BulbContext'
import { useTranslation } from 'react-i18next'
import { Grid, Box, Typography, Button, styled } from '@mui/material'
import { GiCandleHolder, GiHighGrass, GiPalmTree, GiSteampunkGoggles } from 'react-icons/gi'
import { BsFillSunsetFill, BsSunriseFill } from 'react-icons/bs'
import { TbCampfireFilled } from 'react-icons/tb'
import { FaCanadianMapleLeaf, FaHeart, FaBed, FaCandyCane, FaMartiniGlass } from 'react-icons/fa6'
import { IoMdMicrophone } from 'react-icons/io'
import { LuPartyPopper } from 'react-icons/lu'
import { HiColorSwatch } from 'react-icons/hi'
import { PiTreeFill } from 'react-icons/pi'
import { MdForest, MdSunny, MdWaves } from 'react-icons/md'
import { IoFish } from 'react-icons/io5'
import { RiGhostFill, RiPulseFill } from 'react-icons/ri'

// Styled scene button
const SceneButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected'
})(({ theme, selected }) => ({
  width: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.grey[100],
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  textTransform: 'none',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[200]
  }
}))

const IconLabel = styled('span')(({ theme }) => ({
  fontWeight: 600,
  marginLeft: theme.spacing(1),
  whiteSpace: 'nowrap'
}))

export default function Dynamic() {
  const { bulb, setBulb } = useBulb()
  const { t } = useTranslation()

  const changeSceneHandler = (id) => {
    setBulb((prev) => ({ ...prev, sceneId: id, state: true }))
    window.api.setScene(id)
  }

  const renderItem = (name, sceneId, icon) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2.4}
      display="flex"
      justifyContent="center"
      flexGrow={1}
    >
      <SceneButton
        selected={bulb?.sceneId === sceneId}
        onClick={() => changeSceneHandler(sceneId)}
        disabled={!bulb}
        startIcon={icon}
        disableRipple
      >
        <IconLabel>{name}</IconLabel>
      </SceneButton>
    </Grid>
  )

  return (
    <Box sx={{ pl: 3, display: 'flex', flexDirection: 'column', height: '50%' }}>
      <Box sx={{ my: 'auto' }}>
        <Typography variant="h5" sx={{ color: 'white', mb: 3, ml: 2 }}>
          {t('scenes.dynamic.whites')}
        </Typography>
        <Grid container spacing={2}>
          {renderItem(t('scenes.dynamic.candleLight'), 29, <GiCandleHolder size={25} />)}
          {renderItem(t('scenes.dynamic.pulse'), 31, <RiPulseFill size={25} />)}
          {renderItem(t('scenes.dynamic.goldenWhite'), 30, <MdSunny size={25} />)}
          {renderItem(t('scenes.dynamic.steampunk'), 32, <GiSteampunkGoggles size={25} />)}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ color: 'white', my: 3, ml: 2 }}>
          {t('scenes.dynamic.color')}
        </Typography>
        <Grid container spacing={2}>
          {renderItem(t('scenes.dynamic.fireplace'), 5, <TbCampfireFilled size={25} />)}
          {renderItem(t('scenes.dynamic.fall'), 22, <FaCanadianMapleLeaf size={25} />)}
          {renderItem(t('scenes.dynamic.club'), 26, <IoMdMicrophone size={25} />)}
          {renderItem(t('scenes.dynamic.sunset'), 3, <BsFillSunsetFill size={25} />)}
          {renderItem(t('scenes.dynamic.romance'), 2, <FaHeart size={25} />)}
          {renderItem(t('scenes.dynamic.party'), 4, <LuPartyPopper size={25} />)}
          {renderItem(t('scenes.dynamic.pastelColors'), 8, <HiColorSwatch size={25} />)}
          {renderItem(t('scenes.dynamic.spring'), 20, <PiTreeFill size={25} />)}
          {renderItem(t('scenes.dynamic.summer'), 21, <GiPalmTree size={25} />)}
          {renderItem(t('scenes.dynamic.forest'), 7, <MdForest size={25} />)}
          {renderItem(t('scenes.dynamic.jungle'), 24, <GiHighGrass size={25} />)}
          {renderItem(t('scenes.dynamic.mojito'), 25, <FaMartiniGlass size={25} />)}
          {renderItem(t('scenes.dynamic.ocean'), 1, <MdWaves size={25} />)}
          {renderItem(t('scenes.dynamic.deepDive'), 23, <IoFish size={25} />)}
          {renderItem(t('scenes.dynamic.christmas'), 27, <FaCandyCane size={25} />)}
          {renderItem(t('scenes.dynamic.halloween'), 28, <RiGhostFill size={25} />)}
        </Grid>
      </Box>

      <Box sx={{ pb: 4 }}>
        <Typography variant="h5" sx={{ color: 'white', my: 3, ml: 2 }}>
          {t('scenes.dynamic.progressive')}
        </Typography>
        <Grid container spacing={2}>
          {renderItem(t('scenes.dynamic.bedtime'), 10, <FaBed size={25} />)}
          {renderItem(t('scenes.dynamic.wakeUp'), 9, <BsSunriseFill size={25} />)}
        </Grid>
      </Box>
    </Box>
  )
}
