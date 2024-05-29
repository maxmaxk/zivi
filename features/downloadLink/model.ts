export const downloadFile = (data: ArrayBuffer | string, filename?: string): void => {
  const a: HTMLAnchorElement = document.createElement('a')
  a.href =
    typeof data === 'string'
      ? data
      : window.URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }))
  a.download = filename ?? 'download'
  const clickHandler = (): void => {
    a.removeEventListener('click', clickHandler)
  }
  a.addEventListener('click', clickHandler, false)
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
}
