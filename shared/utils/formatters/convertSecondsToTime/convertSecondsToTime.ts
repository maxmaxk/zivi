export const convertSecondsToTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return 'Некорректное значение'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedTime = `${hours > 0 ? `${padZero(hours)}:` : ''}${padZero(minutes)}:${padZero(remainingSeconds)}`
  return formattedTime
}

const padZero = (num: number): string | number => {
  return num < 10 ? `0${num}` : num
}
