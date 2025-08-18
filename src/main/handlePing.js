import Bulb from '@lib/wizlightjs/bulb'

// cata format
// data: {
//     brightness: 30,
//     rgb: [232, 112, 134]
// }

const DEFAULT_IP = '192.168.1.2'

const bulb = new Bulb(DEFAULT_IP)

const handlePing = async (event, data) => {
  const command = String(data.command).toUpperCase()

  switch (command) {
    case 'SET': {
      const { brightness, rgb } = data
      const result1 = await bulb.setBrightness(data.brightness)
      const result2 = await bulb.setRGBColor(...data.rgb)
      console.log(
        `SET success with result1: ${JSON.stringify(result1)} and result2: ${JSON.stringify(result2)}`
      )
      event.sender.send('pong', { error: null, ok: true, data: { brightness, rgb } })
      break
    }

    case 'STATUS': {
      const status = await bulb.getStatus()
      console.log(`STATUS success with return: ${JSON.stringify(status)}`)
      event.sender.send('pong', { error: null, ok: true, data: status })
      break
    }

    case 'INFO': {
      const info = await bulb.getDeviceInfo()
      console.log(`INFO success with return: ${JSON.stringify(info)}`)
      event.sender.send('pong', { error: null, ok: true, data: info })
      break
    }

    default: {
      const message = `unknown commmnad: ${command}`
      console.log(message)
      event.sender.send('pong', { error: message })
      break
    }
  }
}

export default handlePing
