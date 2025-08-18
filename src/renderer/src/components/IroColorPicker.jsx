import { useEffect, useRef } from 'react'
import { isValidHex } from '@utility/common'

import iro from '@jaames/iro'

const COLOR_PICKER_OPTIONS = {
  width: 280,
  // borderWidth: 1,
  // borderColor: '#ccc',
  color: '#ffffff',
  layoutDirection: 'vertical',
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        // borderColor: '#ffffff',
        wheelLightness: false
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        // borderColor: '#000000'
      }
    }
  ]
}

export default function IroColorPicker({ hex, onColorPick, lazy = true }) {
  const colorPickerDomNodeRef = useRef(null) // This will point to the div
  const colorPickerInstanceRef = useRef(null) // This will point to instance of color picker

  useEffect(() => {
    if (colorPickerDomNodeRef.current) colorPickerDomNodeRef.current.innerHTML = ''
    const colorPicker = new iro.ColorPicker(colorPickerDomNodeRef.current, COLOR_PICKER_OPTIONS)
    colorPickerInstanceRef.current = colorPicker
    if (lazy) {
      colorPicker.on('input:end', onColorPick)
    } else {
      colorPicker.on('color:change', onColorPick)
    }
  }, [])

  useEffect(() => {
    if (isValidHex(hex)) {
      colorPickerInstanceRef.current.color.hexString = hex
    }
  }, [hex])

  return <div className="irocolorpicker__main" ref={colorPickerDomNodeRef}></div>
}
