import { app, ipcMain, shell } from 'electron'
import { AUTHOR_URL } from '@main/constants'

const registerIPCEvents = (BulbManager) => {
  ipcMain.on('toggle-bulb-state', async () => {
    await BulbManager.toggleBulb()
  })

  ipcMain.on('visit-author', () => {
    shell.openExternal(AUTHOR_URL)
  })

  ipcMain.on('set-brightness', async (event, brightness) => {
    await BulbManager.setBrightness(brightness)
  })

  ipcMain.on('set-bulb-name', async (event, name) => {
    await BulbManager.setBulbName(name)
  })

  //TODO: TEST!
  ipcMain.on('set-ip', async (event, ip) => {
    await BulbManager.setIp(ip)
  })

  ipcMain.on('set-scene', async (event, sceneId) => {
    await BulbManager.setScene(sceneId)
  })

  ipcMain.on('add-custom-color', async (event, colorName, colorHex) => {
    await BulbManager.addCustomColor(colorName, colorHex)
  })

  ipcMain.on('set-custom-color', async (event, colorId) => {
    await BulbManager.setCustomColor(colorId)
  })

  ipcMain.on('edit-color', async (event, colorId, colorName, colorHex) => {
    await BulbManager.editCustomColor(colorId, colorName, colorHex)
  })

  ipcMain.on('remove-color', async (event, colorId) => {
    await BulbManager.removeCustomColor(colorId)
  })

  ipcMain.handle('get-bulb', () => {
    return BulbManager.getBulbState()
  })

  ipcMain.handle('get-version', () => {
    return app.getVersion()
  })

  ipcMain.on('get-pilot-info', async () => {
    await BulbManager.getPilotInfo()
  })

  ipcMain.on('test', async (event, data) => {
    return await BulbManager.getPilotInfo()
    console.log('[ipcevents][on]:', data)
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
    console.log('[ipcevents][on]: resolved')
    return { message: 'test called with on' }
  })

  ipcMain.handle('test', async (event, data) => {
    return BulbManager.subscribeAndListen()
    console.log('[ipcevents][handle]:', data)
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
    return { message: 'data returned from handle' }
  })
}

export default registerIPCEvents
