import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import log from 'electron-log'

// Custom APIs for renderer
const api = {
  onUpdateBulb: (callback) =>
    electronAPI.ipcRenderer.on('on-update-bulb', (_, bulb) => callback(bulb)),
  cleanupOnUpdate: () => electronAPI.ipcRenderer.removeAllListeners('on-update-bulb'),
  getBulbWhenReady: () => electronAPI.ipcRenderer.invoke('get-bulb'),
  toggleBulb: () => electronAPI.ipcRenderer.send('toggle-bulb-state'),
  setBrightness: (brightness) => electronAPI.ipcRenderer.send('set-brightness', brightness),
  setBulbName: (name) => electronAPI.ipcRenderer.send('set-bulb-name', name),
  setIp: (ip) => electronAPI.ipcRenderer.send('set-ip', ip),
  visitAuthor: () => electronAPI.ipcRenderer.send('visit-author'),
  setScene: (sceneId) => electronAPI.ipcRenderer.send('set-scene', sceneId),
  addCustomColor: (name, hex) => electronAPI.ipcRenderer.send('add-custom-color', name, hex),
  setCustomColor: (name) => electronAPI.ipcRenderer.send('set-custom-color', name),
  editCustomColor: (id, name, hex) => electronAPI.ipcRenderer.send('edit-color', id, name, hex),
  removeCustomColor: (id) => electronAPI.ipcRenderer.send('remove-color', id),
  getVersion: () => electronAPI.ipcRenderer.invoke('get-version'),
  setColor: (hex) => electronAPI.ipcRenderer.send('set-color', hex),
  setTemperature: (temp) => electronAPI.ipcRenderer.send('set-temperature', temp),
  // testInvoke: (data) => electronAPI.ipcRenderer.invoke('test', data),
  // testSend: (data) => electronAPI.ipcRenderer.send('test', data),
  subscribeSyncMessages: () => electronAPI.ipcRenderer.send('subscribe-sync'),
  removeAllListeners: () => electronAPI.ipcRenderer.send('clear-message-listeners')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  log.debug('[PRELOAD] context-isolated hence exposing in mainworld')
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    log.error(`error while exposing in main world: ${JSON.stringify(error)}`)
  }
} else {
  log.debug('[PRELOAD] context not isolated hence attaching directly')
  window.electron = electronAPI
  window.api = api
}
