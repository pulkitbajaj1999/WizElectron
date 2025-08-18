import { useEffect, useState } from 'react'
import log from 'electron-log/renderer'
import { isValidHex, isValidTemperature } from '@utility/common'
import { WIZ_SCENES } from '../utility/constants'
import { BulbContext  } from '@context/BulbContext'


// const MOCK_BULB = {
//   mac: 'cc408563127e',
//   rssi: -51,
//   state: true,
//   sceneId: 11,
//   temp: 2700,
//   dimming: 100,
//   homeId: 18172884,
//   roomId: 29878351,
//   rgn: 'eu',
//   moduleName: 'ESP25_SHRGB_01',
//   fwVersion: '1.34.0',
//   groupId: 0,
//   ping: 0,
//   accUdpPropRate: 100,
//   ip: '192.168.1.2',
//   port: 38899,
//   name: 'ESP25_SHRGB_01',
//   customColors: [
//     {
//       id: 33,
//       name: 'red',
//       hex: '#ffffff'
//     }
//   ]
// }

const getSceneId = (scene) => {
  let validScenes = Object.entries(WIZ_SCENES)
  let mappedScene = validScenes.find(
    (el) => String(el[1]).toLowerCase() === String(scene).toLowerCase()
  )
  return mappedScene ? parseInt(mappedScene[0]) : null
}

const getSceneName = (sceneId) => {
  let validScenes = Object.entries(WIZ_SCENES)
  let mappedScene = validScenes.find((el) => parseInt(el[0]) === parseInt(sceneId))
  return mappedScene ? mappedScene[1] : null
}

const default_local_state = {
  state: false,
  scene: null,
  color: '#fff',
  brightness: 100,
  temp: null,
  ip: ''
}

export default function BulbProvider({ children }) {
  const [bulb, setBulb] = useState()
  const [localBulbState, setLocalBulbState] = useState(default_local_state)
  const [formatDeviceInfo, setFormatDeviceInfo] = useState(true)

  const syncLocalState = (bulb) => {
    if (!bulb) {
      setLocalBulbState(default_local_state)
    } else {
      const { state, sceneId, temp, dimming, color, ip } = bulb
      let localBulbState = {
        state: state || false,
        scene: getSceneName(sceneId) || 0,
        brightness: dimming || 100,
        temp: temp || null,
        color: color || '#fff',
        ip: ip || ''
      }
      setLocalBulbState(localBulbState)
    }
  }

  useEffect(() => {
    if (window?.api) {
      log.debug('[RENDERER] Context loaded')
      // setting up bulb and get bulb data
      window.api.getBulbWhenReady().then((bulb) => {
        log.info('[RENDERER] Bulb loaded')
        setBulb(bulb)
        syncLocalState(bulb)
      })
    }
  }, [])

  // reloading bulb whenever bulb update response arrives
  useEffect(() => {
    if (window?.api) {
      window.api.onUpdateBulb((bulb) => {
        log.debug('[RENDERER] Bulb state updated:', bulb)
        setBulb(bulb)
        syncLocalState(bulb)
      })
    }
    return () => window.api?.cleanupOnUpdate()
  }, [])

  // subscribe to sync pilot messages
  // useEffect(() => {
  //   if (window.api && bulb?.mac) {
  //     log.debug(`[RENDERER] subscribing to sync...`)
  //     window.api.subscribeSyncMessages()
  //   }
  //   return () => window.api.removeAllListeners()
  // }, [bulb?.mac])

  const apiActions = {
    toggleBulb: () => {
      log.info('[RENDERER] toggle bulb')
      window.api.toggleBulb()
      setLocalBulbState((prev) => ({ ...prev, state: !prev.state }))
    },

    setBrightness: (brightness) => {
      if (brightness) {
        log.info(`[RENDERER] setting brightness: ${brightness}`)
        window.api.setBrightness(brightness)
        setLocalBulbState((prev) => ({ ...prev, brightness: brightness }))
      }
    },

    setScene: (sceneName) => {
      let sceneId = getSceneId(sceneName)
      if (sceneId) {
        log.info(`[RENDERER] setting scene: ${sceneName}`)
        window.api.setScene(sceneId)
        setLocalBulbState((prev) => ({ ...prev, scene: sceneName }))
      }
    },
    setColor: (hex) => {
      if (isValidHex) {
        log.info(`[RENDERER] setting color: ${hex}`)
        window.api.setColor(hex)
        setLocalBulbState((prev) => ({ ...prev, color: hex }))
      }
    },

    setTemperature: (temp) => {
      temp = parseInt(temp)
      if (isValidTemperature(temp)) {
        log.info(`[renderer] setting temp: ${temp}`)
        window.api.setTemperature(temp)
        setLocalBulbState((prev) => ({ ...prev, temp: temp }))
      }
    },

    setIp: (ip) => {
      window.api.setIp(ip)
    }
  }

  return (
    <BulbContext.Provider
      value={{ bulb, setBulb, localBulbState, apiActions, formatDeviceInfo, setFormatDeviceInfo }}
    >
      {children}
    </BulbContext.Provider>
  )
}