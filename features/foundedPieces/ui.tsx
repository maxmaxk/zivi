import { ETextStyle, type IOptionLabel } from './types'
import styles from './styles.module.scss'

export const foundedPieces = (line: string, searchLine: string): JSX.Element[] => {
  const inputValue = searchLine ? searchLine.toLocaleUpperCase() : ''
  const lineStr = line?.toString() ?? ''
  const parts: IOptionLabel = inputValue === '' || !line ? [{ text: lineStr, textStyle: ETextStyle.Normal }] : []
  if (inputValue !== '' && line) {
    const label = lineStr.toLocaleUpperCase()
    let i = label.indexOf(inputValue)
    let k = 0
    while (i >= 0) {
      if (i > k) parts.push({ text: lineStr.slice(k, i), textStyle: ETextStyle.Normal })
      parts.push({ text: lineStr.slice(i, i + inputValue.length), textStyle: ETextStyle.HighLight })
      k = i + inputValue.length
      i = label.indexOf(inputValue, k)
    }
    if (k < lineStr.length) {
      parts.push({ text: lineStr.slice(k, lineStr.length), textStyle: ETextStyle.Normal })
    }
  }
  return parts.map((part, index) => {
    return (
      <span
        key={index}
        className={`${part.textStyle === ETextStyle.HighLight ? styles.optionHighlight as string : ''}`}>
          {part.text}
      </span>
    )
  })
}
