import { CONFIG, DISCOVER_TIMEOUT, MAX_DEFAULT_COLORS } from '@main/constants'
import { discover } from '@lib/wikari/src/mod'
import log from 'electron-log'
import fs from 'fs'

class BulbManager {
  constructor(window) {
    this.window = window
    this.bulb = null
    this.bulbState = null
    this.appData = null
    this.bulbIP = null
    this.init()
  }

  async init() {
    await this.setUpBulb()
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

  async searchBulb() {
    let isBulbFound = false
    let bulb = null

    while (!isBulbFound) {
      log.info('Looking for bulb')

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
      }

      if (!isBulbFound) {
        const res = await discover({ waitMs: DISCOVER_TIMEOUT })
        if (res.length > 0) {
          bulb = res[0]
          isBulbFound = true
        } else {
          log.error('Bulb not found')
        }
      }

      log.info('Retrying to find bulb')
    }

    return bulb
  }

  async setUpBulb() {
    const configData = this.getConfigData()
    this.bulbIP = configData.bulbIp
    this.bulb = await this.searchBulb()

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

    this.window.webContents.send('on-update-bulb', this.bulbState)
    log.info('Sending bulb data to renderer process...')
  }

  async getBulbState() {
    return this.bulbState
  }

  saveConfig() {
    fs.writeFileSync(CONFIG, JSON.stringify(this.appData))
  }

  async reconnectBulb() {
    this.bulbState = null
    this.bulb = null
    this.window.webContents.send('on-update-bulb', this.bulbState)
    log.info('Reconnecting to bulb...')
    await this.setUpBulb()
  }

  async toggleBulb() {
    try {
      log.info('Bulb toggled')
      await this.bulb.toggle()
      this.bulbState.state = !this.bulbState.state
      this.window.webContents.send('on-update-bulb', this.bulbState)
    } catch {
      log.error('Failed to toggle bulb, connection lost')
      await this.reconnectBulb()
    }
  }

  async setBrightness(brightness) {
    try {
      log.info('Setting brightness')
      await this.bulb.brightness(brightness)
      this.bulbState.dimming = brightness
      this.window.webContents.send('on-update-bulb', this.bulbState)
    } catch {
      log.error('Failed to set brightness, connection lost')
      await this.reconnectBulb()
    }
  }

  setBulbName(name) {
    this.bulbState.name = name
    this.appData.bulbName = name
    this.saveConfig()
  }

  setIp(ip) {
    this.bulbIP = ip
  }

  async setScene(sceneId) {
    try {
      log.info('Setting scene')
      this.bulbState.state = true
      await this.bulb.scene(sceneId)
      this.bulbState.sceneId = sceneId
      this.window.webContents.send('on-update-bulb', this.bulbState)
    } catch {
      log.error('Failed to set scene, connection lost')
      await this.reconnectBulb()
    }
  }

  getCustomColorNewId() {
    if (this.bulbState.customColors.length === 0) return MAX_DEFAULT_COLORS

    const ids = this.bulbState.customColors.map((color) => color.id)
    return Math.max(...ids) + 1
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
}

export default BulbManager
