import log from 'electron-log/renderer'
import React, { createContext, useContext, useEffect, useState } from 'react'

// Create context with default value undefined
export const BulbContext = createContext(undefined)

const BulbProvider = ({ children }) => {
  const [bulb, setBulb] = useState()

  useEffect(() => {
    log.debug('[RENDERER] Context loaded')
    window.api.getBulbWhenReady().then((bulb) => {
      log.debug('[RENDERER] Bulb loaded')
      setBulb(bulb)
    })
  }, [])

  useEffect(() => {
    window.api.onUpdateBulb((bulb) => {
      log.debug('[RENDERER] Bulb updated')
      setBulb(bulb)
    })
  }, [])

  return <BulbContext.Provider value={{ bulb, setBulb }}>{children}</BulbContext.Provider>
}

export const useBulb = () => {
  const context = useContext(BulbContext)
  if (context === undefined) {
    throw new Error('useBulb must be used within a BulbProvider')
  }
  return context
}

export default BulbProvider
