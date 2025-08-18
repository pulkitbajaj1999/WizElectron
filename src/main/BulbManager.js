import { CONFIG, DISCOVER_TIMEOUT, MAX_DEFAULT_COLORS } from '@main/constants'
import { discover } from '@lib/wikari/src/mod'
import log from 'electron-log'
import fs from 'fs'

class BulbManager {
  static _wrapWithReconnectionHandling(fn) {
    return async function (...args) {
      try {
        return await fn.apply(this, args)
      } catch (err) {
        if (err?.code === 2) {
          log.error(`Waiting on previous response | discarding request...`)
        } else {
          log.error('Failed to apply operation, connection lost | errpr', err)
          await this.reconnectBulb()
        }
      }
    }
  }

  constructor(window) {
    this.window = window
    this.bulb = null
    this.bulbState = null
    this.appData = null
    this.bulbIP = null
    this._initPromise = null
  }

  async init() {
    if (!this._initPromise) {
      log.info('Bulb not initialized | Initializing...')
      this._initPromise = this.setUpBulb()
    }
    return this._initPromise
  }

  getConfigData() {
    let data
    try {
      data = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'))
      log.info('Config data found with bulb IP: ', data.bulbIp)
    } catch {
      data = {
        bulbIp: null,
        bulbName: null,
        customColors: []
      }
      log.warn('Config data not found, creating new config file...')
    }
    return data
  }

  saveConfig() {
    fs.writeFileSync(CONFIG, JSON.stringify(this.appData))
  }

  async _searchBulb() {
    let isBulbFound = false
    let bulb = null

    while (!isBulbFound) {
      if (this.bulbIP) {
        log.info('Trying to connect to bulb with IP: ', this.bulbIP)
        const res = await discover({ addr: this.bulbIP, waitMs: DISCOVER_TIMEOUT })

        if (res.length > 0) {
          bulb = res[0]
          isBulbFound = true
        } else {
          log.error('Bulb not found with IP: ', this.bulbIP)
          this.bulbIP = null
        }
      } else {
        log.info(`Trying to discover bulbs on network...`)
        const res = await discover({ waitMs: DISCOVER_TIMEOUT })
        if (res.length > 0) {
          bulb = res[0]
          isBulbFound = true
        } else {
          log.error('Bulb not found')
        }
      }
      if (!isBulbFound) log.info('Retrying to find bulb')
    }
    return bulb
  }

  async setUpBulb() {
    log.debug('Setting up bulb...')
    const configData = this.getConfigData()
    this.bulbIP = configData.bulbIp
    this.bulb = await this._searchBulb()

    log.debug('Getting bulb state...')
    const pilot = (await this.bulb.getPilot()).result

    const bulbConfig = await this.bulb.sendRaw({
      method: 'getSystemConfig',
      env: '',
      params: { mac: '', rssi: 0 }
    })

    const configResult = bulbConfig.result

    this.bulbState = {
      ...pilot,
      ...configResult,
      ip: this.bulb.address,
      port: this.bulb.bulbPort,
      name: configData && configData.bulbName ? configData.bulbName : configResult.moduleName,
      customColors: configData && configData.customColors ? configData.customColors : []
    }

    this.appData = {
      bulbIp: this.bulbState.ip,
      bulbName: this.bulbState.name,
      customColors: this.bulbState.customColors
    }

    this.saveConfig()

    log.debug(this.window ? 'Current window is OK' : 'Current window is NOT DEFINED')
    log.debug(this.bulbState ? 'Bulb state is OK' : 'Bulb state is NOT DEFINED')

    log.debug('Sending bulb data to renderer process...')
    this.window.webContents.send('on-update-bulb', this.bulbState)
  }

  async getBulbState() {
    await this.init()
    return this.bulbState
  }

  async reconnectBulb() {
    if (this.bulb) {
      this.bulb.removeAllListeners()
    }
    this.bulbState = null
    this.bulb = null
    this.window.webContents.send('on-update-bulb', this.bulbState)
    log.info('Reconnecting to bulb...')
    await this.setUpBulb()
  }

  setBulbName(name) {
    this.bulbState.name = name
    this.appData.bulbName = name
    this.saveConfig()
  }

  async setIp(ip) {
    try {
      log.info(`Setting IP: ${ip} and reconnecting`)
      this.bulbIP = ip
      await this.reconnectBulb()
    } catch (err) {
      log.error('Failed to set IP with error', err)
    }
  }

  async addCustomColor(colorName, colorHex) {
    const newId = this.getCustomColorNewId()
    this.bulbState.customColors.push({ id: newId, name: colorName, hex: colorHex })
    this.appData.customColors = this.bulbState.customColors
    this.saveConfig()
  }

  async setCustomColor(colorId) {
    try {
      const color = this.bulbState.customColors.find((c) => c.id === colorId)
      if (!color) return
      this.bulbState.state = true
      this.bulbState.sceneId = colorId
      await this.bulb.color(color.hex)
      this.window.webContents.send('on-update-bulb', this.bulbState)
    } catch {
      log.error('Failed to set custom color, connection lost')
      await this.reconnectBulb()
    }
  }

  getCustomColorNewId() {
    if (this.bulbState.customColors.length === 0) return MAX_DEFAULT_COLORS

    const ids = this.bulbState.customColors.map((color) => color.id)
    return Math.max(...ids) + 1
  }

  async editCustomColor(colorId, colorName, colorHex) {
    const color = this.bulbState.customColors.find((c) => c.id === colorId)
    if (!color) return
    color.name = colorName
    color.hex = colorHex
    this.appData.customColors = this.bulbState.customColors
    this.saveConfig()
  }

  async removeCustomColor(colorId) {
    this.bulbState.customColors = this.bulbState.customColors.filter((c) => c.id !== colorId)
    this.appData.customColors = this.bulbState.customColors
    this.saveConfig()
  }

  endConnection() {
    if (this.bulb) {
      this.bulb.closeConnection()
      log.info('Connection with bulb closed')
    }
  }

  async subscribeSyncMessages() {
    try {
      if (this.bulb) {
        log.debug('Subscribing to sync pilot...')
        await this.bulb.subscribe()
        this.bulb.onSync((message) => {
          log.debug('[Bulbmanager> onSyncMessage] message: ', message)
          this.window.webContents.send('on-update-bulb', { ...this.bulbState, syncPilot: message })
        })
      }
    } catch (err) {
      log.error('Failed to subscribe to sync pilot', err)
    }
  }

  removeAllListeners() {
    if (this.bulb) {
      log.debug(`removing all message listeners....`)
      this.bulb.removeAllListeners()
    }
  }

  // bulb controller functions

  toggleBulb = BulbManager._wrapWithReconnectionHandling(async () => {
    if (this.bulbState?.state) {
      log.debug('Turn off bulb')
      await this.bulb.turn(false)
      this.bulbState.state = false
    } else {
      log.debug('Turn on bulb')
      await this.bulb.turn(true)
      this.bulbState.state = true
    }
    // await this.bulb.toggle()
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })

  setBrightness = BulbManager._wrapWithReconnectionHandling(async (brightness) => {
    if (!brightness) return
    log.debug(`Setting brightness: ${brightness}`)
    await this.bulb.brightness(brightness)
    this.bulbState.dimming = brightness
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })

  setScene = BulbManager._wrapWithReconnectionHandling(async (sceneId) => {
    if (!sceneId) return
    log.debug(`Setting sceneid: ${sceneId}`)
    this.bulbState.state = true
    await this.bulb.scene(sceneId)
    this.bulbState.sceneId = sceneId
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })

  setColor = BulbManager._wrapWithReconnectionHandling(async (hex) => {
    if (!hex) return
    log.debug(`Setting hex-color: ${hex}`)
    this.bulbState.state = true
    this.bulbState.sceneId = 0
    this.bulbState.color = hex
    this.bulbState.temp = null
    await this.bulb.color(hex)
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })

  setTemperature = BulbManager._wrapWithReconnectionHandling(async (temp) => {
    if (!temp) return
    log.debug(`Setting temperature: ${temp}`)
    this.bulbState.state = true
    this.bulbState.sceneId = 0
    this.bulbState.temp = temp
    this.bulbState.color = null
    await this.bulb.white(temp)
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })

  getPilotInfo = BulbManager._wrapWithReconnectionHandling(async () => {
    log.info(`Getting pilot info for the bulb`)
    let data = await this.bulb.getPilot()
    log.info('pilot-info:', data)
    this.bulbState = {
      ...this.bulbState,
      pilotInfo: data
    }
    this.window.webContents.send('on-update-bulb', this.bulbState)
  })
}

export default BulbManager
