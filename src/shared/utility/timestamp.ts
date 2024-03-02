const currentDate = new Date()

export const getTimestamp = () => {
  return Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
    year: 'numeric',
  })
    .format(currentDate)
    .split('.')
    .reverse()
    .join('')
}
