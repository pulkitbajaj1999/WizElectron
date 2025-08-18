import { createContext, useContext } from 'react'

// Create context with default value undefined
export const BulbContext = createContext(undefined)

export const useBulb = () => {
  const context = useContext(BulbContext)
  if (context === undefined) {
    throw new Error('useBulb must be used within a BulbProvider')
  }
  return context
}