import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Button, Stack, InputAdornment } from '@mui/material'
import { useBulb } from '../context/BulbContext'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function IpModal() {
  const { t } = useTranslation()
  const { bulb } = useBulb()
  const [value, setValue] = useState('')
  const [invalidIP, setInvalidIP] = useState(false)
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!ipRegex.test(value)) {
      setInvalidIP(true)
      return
    }

    window.api.setIp(value)
    setValue('')
    setInvalidIP(false)
  }

  const handleChangeIp = (e) => {
    setInvalidIP(false)
    setValue(e.target.value)
  }

  useEffect(() => {
    if (bulb && bulb.ip !== value) {
      setValue(bulb.ip)
    }
  }, [bulb?.ip])

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="IP"
        placeholder={t('ip.placeholder')}
        value={value}
        onChange={handleChangeIp}
        autoFocus
        fullWidth
        required
        variant="outlined"
        error={invalidIP}
        InputProps={{
          endAdornment:
            !invalidIP && ipRegex.test(value) && value !== '' ? (
              <InputAdornment position="end">
                <CheckCircleIcon sx={{ color: 'green' }} />
              </InputAdornment>
            ) : null
        }}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2 }}>
        {t('connect.setIp')}
      </Button>
    </Stack>
  )
}
